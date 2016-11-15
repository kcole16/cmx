from datetime import timedelta
from uuid import uuid4

from flask import render_template, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
from passlib.hash import sha256_crypt
from whitenoise import WhiteNoise

from server.models import application, db, User, Supplier, Deal, Order, Quote, Price
from server.mailer import send_supplier_emails, new_signup
from server.settings import PRODUCTION

import pusher

pusher_client = pusher.Pusher(
    app_id='267433',
    key='31409d0487a999b7a26c',
    secret='82983e1e986f82e187da',
    ssl=True
)

def authenticate(email, password):
    user = User.query.filter_by(email=email).first()
    if user and sha256_crypt.verify(password, user.password):
        return user


def identity(payload):
    user_id = payload['identity']
    user = User.query.filter_by(id=user_id).first()
    return user


application.debug = True
application.config['SECRET_KEY'] = 'super-secret'
application.config['JWT_AUTH_USERNAME_KEY'] = 'email'
application.config['JWT_LEEWAY'] = timedelta(days=90)
db = db
cors = CORS(application)

jwt = JWT(application, authenticate, identity)
static = WhiteNoise(application, root='./static/')


@application.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        submitted = False
    elif request.method == 'POST':
        email = request.form['email']
        new_signup(email)
        submitted = True
    return render_template('home.html', submitted=submitted)


@application.route('/user', methods=['GET'])
@jwt_required()
def user():
    user = {
        'email': current_identity.email,
        'role': current_identity.role
    }
    response = jsonify({'user': user})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/app', methods=['GET'])
@application.route('/app/suppliers', methods=['GET'])
@application.route('/app/quoteSpecifics', methods=['GET'])
@application.route('/app/viewQuotes', methods=['GET'])
def app():
    print('Here')
    return render_template('index.html');


@application.route('/requestQuotes', methods=['POST'])
@jwt_required()
def request_quotes():
    user = current_identity
    data = request.get_json()
    suppliers = []
    uuid = data['vessel']+data['port']+data['eta']+current_identity.email
    status = 'enquiry' if data['suppliers'] else 'order'
    deal = Deal(user, uuid, data['port'], data['vessel'], data['imo'], data['loa'],
                data['buyer'],
                data['orderedBy'], data['grossTonnage'], data['additionalInfo'],
                data['eta'], data['etd'],
                data['portCallReason'], data['agent'], data['currency'],
                data['location'], status)
    for order in data['orders']:
        new_order = Order(order['grade'], order['quantity'],
                          order['specification'], order['maxSulphur'],
                          order['unit'], order['comments'], deal)
        db.session.add(new_order)
    db.session.add(deal)
    db.session.commit()
    if data['suppliers']:
        for supplier in data['suppliers']:
            supplier = Supplier.query.filter_by(name=supplier).first()
            suppliers.append(supplier)
            new_quote = Quote(None, None,
                None, None, None,
                supplier, deal)
            db.session.add(new_quote)
        db.session.commit()
        send_supplier_emails(suppliers, deal, data['orders'])
    response = jsonify({'user': current_identity.email})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/getSuppliers', methods=['GET'])
@jwt_required()
def get_suppliers():
    port = request.args['port']
    suppliers = [{'name': supplier.name, 'email': supplier.email} for supplier in
                 Supplier.query.filter_by(port=port).limit(10)]
    response = jsonify({'suppliers': suppliers})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/send_quote', methods=['GET', 'POST'])
def send_quote():
    order_list = []
    count = 0
    if request.method == 'POST':
        data = request.form
        supplier = Supplier.query.filter_by(id=data['supplier_id']).first()
        deal = Deal.query.filter_by(uuid=data['deal_id']).first()
        orders = Order.query.filter_by(deal_id=deal.id)
        quote = {
            'name': supplier.name,
            'expiration': data['expiration'],
            'info': data['info'],
            'phone': data['phone'],
            'email': data['email'],
            'skype': data['skype']
        }
        Quote.query.filter_by(deal_id=deal.id, supplier_id=supplier.id).update(
            dict(validity=quote['expiration'], email=quote['email'],
            phone=quote['phone'], skype=quote['skype'], info=quote['info']))
        new_quote = Quote.query.filter_by(deal_id=deal.id, supplier_id=supplier.id).first()
        db.session.commit()
        for o in orders:
            order_data = {
                'grade': data['grade%s' % count],
                'quantity': data['quantity%s' % count],
                'maxSulphur': data['maxSulphur%s' % count],
                'unit': data['unit%s' % count],
                'specifications': data['spec%s' % count],
                'comments': data['comments%s' % count],
                'price': data['price%s' % count],
                'terms': data['terms%s' % count],
                'delivery': data['delivery%s' % count],
                'physical': data['physical%s' % count]
            }
            order = Order.query.filter_by(deal_id=deal.id, grade=order_data['grade']).first()
            price = Price(order_data['price'], order_data['terms'], order_data['physical'],
                order_data['delivery'], new_quote, order)
            db.session.add(price)
            db.session.commit()
            order_list.append(order_data)
            count += 1
        quote['orders'] = order_list
        pusher_client.trigger('test_channel', 'my_event', quote)
        return render_template('success_quote.html', deal=deal)
    else:
        deal_id = request.args['deal_id']
        supplier_id = request.args['supplier_id']
        deal = Deal.query.filter_by(uuid=deal_id).first()
        orders = Order.query.filter_by(deal_id=deal.id)
        for order in orders:
            order = {
                'grade': order.grade,
                'quantity': order.quantity,
                'unit': order.unit,
                'maxSulphur': order.maxSulphur,
                'spec': order.spec,
                'comments': order.comments
            }
            order['number'] = count
            order_list.append(order)
            count += 1
        return render_template('quote_form.html', deal_id=deal_id,
                               supplier_id=supplier_id, deal=deal,
                               orders=order_list)


@application.route('/getDeals', methods=['GET'])
@jwt_required()
def get_deals():
    user = current_identity
    deals = []
    for d in Deal.query.filter_by(user_id=user.id):
        quotes = Quote.query.filter_by(deal_id=d.id)
        quote = None
        order_list = []
        orders = [{'id':o.id, 'grade': o.grade, 'quantity': o.quantity, 'unit': o.unit, 'maxSulphur': o.maxSulphur, 'spec': o.spec, 'comments': o.comments} 
            for o in Order.query.filter_by(deal_id=d.id)]
        for q in quotes:
            if q.accepted:
                for order in orders:
                    price = Price.query.filter_by(order_id=order['id'], quote_id=q.id).first()
                    order['price'] = price.price
                    order['terms'] = price.terms
                    order['delivery'] = price.delivery
                    order['physical'] = price.physical
                    order_list.append(order)
        if len(order_list) == 0:
            order_list = orders
        deal = {
            'port': d.port, 
            'vessel': d.vessel,
            'imo': d.imo,
            'loa': d.loa,
            'grossTonnage': d.grossTonnage,
            'buyer': d.buyer,
            'orderedBy': d.orderedBy,
            'eta': d.eta,
            'etd': d.etd,
            'portCallReason': d.portCallReason,
            'agent': d.agent,
            'currency': d.currency,
            'location': d.location,
            'additionalInfo': d.additionalInfo,
            'quotes': [],
            'orders': order_list,
            'status': d.status
        }
        deals.append(deal)
    response = jsonify({'deals': deals})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/updateStatus', methods=['POST'])
@jwt_required()
def update_status():
    data = request.get_json()
    suppliers = []
    uuid = data['deal']['vessel']+data['deal']['port']+data['deal']['eta']+data['deal']['buyer']
    deal = Deal.query.filter_by(uuid=uuid).update(dict(status=data['status']))
    db.session.commit()
    response = jsonify({'deal': data['deal'], 'status': data['status']})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def get_orders(order_list, quote, count):
    orders = []
    for order in order_list:
        price = Price.query.filter_by(order_id=order['id'], quote_id=quote.id).first()
        if price:
            order['price%s' % count] = price.price
            order['terms%s' % count] = price.terms 
            order['delivery%s' % count] = price.delivery
            order['physical%s' % count] = price.physical 
        orders.append(order)
    return orders


@application.route('/getQuotes', methods=['POST'])
@jwt_required()
def get_quotes():
    data = request.get_json()
    quotes = []
    uuid = data['deal']['vessel']+data['deal']['port']+data['deal']['eta']+data['deal']['buyer']
    deal = Deal.query.filter_by(uuid=uuid).first()
    quotes = Quote.query.filter_by(deal_id=deal.id)
    orders = Order.query.filter_by(deal_id=deal.id)
    order_list = []
    for o in orders:
        order = {
            'id': o.id,
            'grade': o.grade,
            'quantity': o.quantity,
            'unit': o.unit,
            'maxSulphur': o.maxSulphur,
            'spec': o.spec,
            'comments': o.comments
        }
        order_list.append(order)
    quote_list = []
    count = 0
    for quote in quotes:
        quote_data = {
            'id': quote.id,
            'name': quote.supplier.name,
            'expiration': quote.validity,
            'info': quote.info,
            'phone': quote.phone,
            'email': quote.email,
            'skype': quote.skype,
            'validity': quote.validity,
            'orders%s' % count: get_orders(order_list, quote, count),
            'count': count
        }
        quote_list.append(quote_data)
        count += 1
    response = jsonify({'quotes': quote_list})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/addQuote', methods=['POST'])
@jwt_required()
def add_quote():
    data = request.get_json()['quote']
    Quote.query.filter_by(id=data['id']).update(dict(phone=data['phone'], 
        skype=data['skype'], email=data['email'], validity=data['validity']))
    quote = Quote.query.filter_by(id=data['id']).first()
    quote_data = {
        'id': quote.id,
        'name': quote.supplier.name,
        'expiration': quote.validity,
        'info': quote.info,
        'phone': quote.phone,
        'email': quote.email,
        'skype': quote.skype
    }
    db.session.commit()
    order_list = []
    for o in data['orders']:
        order_data = {
            'grade': o['grade'],
            'quantity': o['quantity'],
            'maxSulphur': o['maxSulphur'],
            'unit': o['unit'],
            'specs': o['spec'],
            'comments': o['comments'],
            'price': o['price'],
            'terms': o['terms'],
            'physical': o['physical'],
            'delivery': o['delivery']
        }
        order = Order.query.filter_by(deal_id=quote.deal_id, grade=order_data['grade']).first()
        price = Price(order_data['price'], order_data['terms'], order_data['physical'],
            order_data['delivery'], quote, order)
        db.session.add(price)
        db.session.commit()
        order_list.append(order_data)
    quote_data['orders'] = order_list
    d = Deal.query.filter_by(id=quote.deal_id).first()
    deal = {
        'port': d.port, 
        'vessel': d.vessel,
        'imo': d.imo,
        'loa': d.loa,
        'grossTonnage': d.grossTonnage,
        'buyer': d.buyer,
        'orderedBy': d.orderedBy,
        'eta': d.eta,
        'etd': d.etd,
    };
    response = jsonify(deal)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/saveQuote', methods=['POST'])
@jwt_required()
def save_quote():
    data = request.get_json()['quote']
    quote = Quote.query.filter_by(id=data['id']).first()
    for o in data['orders']:
        order = Order.query.filter_by(deal_id=quote.deal_id, grade=o['grade']).first()
        price = Price.query.filter_by(quote_id=quote.id, order_id=order.id).update(dict(
            spec=o['spec'], terms=o['terms'], price=o['price'], physical=o['physical'], delivery=o['delivery']))
        db.session.commit()
    d = Deal.query.filter_by(id=quote.deal_id).first()
    deal = {
        'port': d.port, 
        'vessel': d.vessel,
        'imo': d.imo,
        'loa': d.loa,
        'grossTonnage': d.grossTonnage,
        'buyer': d.buyer,
        'orderedBy': d.orderedBy,
        'eta': d.eta,
        'etd': d.etd,
    };
    response = jsonify(deal)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/acceptQuote', methods=['POST'])
@jwt_required()
def accept_quote():
    data = request.get_json()['quote']
    Quote.query.filter_by(id=data['id']).update(dict(accepted=True))
    quote = Quote.query.filter_by(id=data['id']).first()
    Deal.query.filter_by(id=quote.deal_id).update(dict(status='done'))
    db.session.commit()
    d = Deal.query.filter_by(id=quote.deal_id).first()
    deal = {
        'port': d.port, 
        'vessel': d.vessel,
        'imo': d.imo,
        'loa': d.loa,
        'grossTonnage': d.grossTonnage,
        'buyer': d.buyer,
        'orderedBy': d.orderedBy,
        'eta': d.eta,
        'etd': d.etd,
        'orders': data['orders'],
        'status': 'done'
    }
    response = jsonify(deal)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@application.route('/actualizeDeal', methods=['POST'])
@jwt_required()
def actualize_deal():
    deal = request.get_json()['deal']
    orders = request.get_json()['orders']
    uuid = deal['vessel']+deal['port']+deal['eta']+deal['buyer']
    Deal.query.filter_by(uuid=uuid).update(dict(status='actualized'))
    deal = Deal.query.filter_by(uuid=uuid).first()
    for order in orders:
        Order.query.filter_by(deal_id=deal.id, grade=order['grade']).update(dict(
            delivery_date=order['deliveryDate'], volume_delivered=order['volumeDelivered'],
            declared_density=order['declaredDensity']))
    db.session.commit()
    response = jsonify({'status': 'Deal Actualized'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    application.debug = True
    if PRODUCTION:
        application.debug = False
    application.run()
