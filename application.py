from datetime import timedelta
from uuid import uuid4

from flask import render_template, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity
from flask_cors import CORS
from passlib.hash import sha256_crypt
from whitenoise import WhiteNoise

from models import application, db, User, Supplier, Deal, Order
from mailer import send_supplier_emails, new_signup
from settings import PRODUCTION

import pusher

pusher_client = pusher.Pusher(
    app_id='259911',
    key='213331f62067dec74527',
    secret='d4cdf1c15264540b31d1',
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


@application.route('/login', methods=['GET'])
@application.route('/suppliers', methods=['GET'])
@application.route('/quoteSpecifics', methods=['GET'])
@application.route('/viewQuotes', methods=['GET'])
def app():
    return render_template('index.html');


# @application.route('/suppliers', methods=['GET'])
# @application.route('/quoteSpecifics', methods=['GET'])
@application.route('/requestQuotes', methods=['POST'])
@jwt_required()
def request_quotes():
    data = request.get_json()
    suppliers = []
    for supplier in data['suppliers']:
        supplier = Supplier.query.filter_by(name=supplier).first()
        suppliers.append(supplier)
    print(data)
    deal = Deal(uuid4(), data['port'], data['vessel'], data['imo'], data['loa'],
                data['buyer'],
                data['orderedBy'], data['grossTonnage'], data['additionalInfo'],
                data['eta'], data['etd'],
                data['portCallReason'], data['agent'], data['currency'],
                data['location'])
    for order in data['orders']:
        new_order = Order(order['grade'], order['quantity'],
                          order['specification'],
                          order['unit'], order['comments'], deal)
        db.session.add(new_order)
    db.session.add(deal)
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
                 Supplier.query.filter_by(port=port)]
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
        for order in orders:
            order = {
                'grade': data['grade%s' % count],
                'quantity': data['quantity%s' % count],
                'unit': data['unit%s' % count],
                'specifications': data['spec%s' % count],
                'comments': data['comments%s' % count],
                'price': data['price%s' % count],
                'terms': data['terms%s' % count],
                'delivery': data['delivery%s' % count],
                'physical': data['physical%s' % count]
            }
            order_list.append(order)
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
                'spec': order.spec,
                'comments': order.comments
            }
            order['number'] = count
            order_list.append(order)
            count += 1
        return render_template('quote_form.html', deal_id=deal_id,
                               supplier_id=supplier_id, deal=deal,
                               orders=order_list)


if __name__ == "__main__":
    application.debug = False
    if PRODUCTION:
        application.debug = True
    application.run()
