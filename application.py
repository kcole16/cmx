import json
from datetime import timedelta
from uuid import uuid4

from flask import Flask, render_template, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask.ext.cors import CORS, cross_origin
from passlib.hash import sha256_crypt
from whitenoise import WhiteNoise

from models import application, db, User, Supplier, Deal
from mailer import send_supplier_emails

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

@application.route('/', methods=['GET'])
@application.route('/login', methods=['GET'])
@application.route('/suppliers', methods=['GET'])
@application.route('/quoteSpecifics', methods=['GET'])
@application.route('/viewQuotes', methods=['GET'])
def home():
    return render_template('index.html')

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
    deal = Deal(uuid4(), data['port'], data['vessel'], data['imo'], data['po'], data['buyer'],
        data['vesselType'], data['requisition'], data['orderedBy'], data['eta'],
        data['etd'], data['portCallReason'], data['agent'], data['currency'])
    db.session.add(deal)
    db.session.commit()
    send_supplier_emails(suppliers, deal)
    response = jsonify({'user': current_identity.email})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/getSuppliers', methods=['GET'])
@jwt_required()
def get_suppliers():
    port = request.args['port']
    suppliers = [{'name': supplier.name} for supplier in Supplier.query.filter_by(port=port)]
    response = jsonify({'suppliers': suppliers})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@application.route('/send_quote', methods=['GET','POST'])
def send_quote():
    if request.method == 'POST':
        data = request.form
        supplier = Supplier.query.filter_by(id=data['supplier_id']).first()
        deal = Deal.query.filter_by(uuid=data['deal_id']).first()
        quote = {
            'name': supplier.name,
            'price': data['gas_oil']+'/'+data['fuel_oil'],
            'terms': data['terms'],
            'expiration': data['expiration']
        }
        print(quote)
        pusher_client.trigger('test_channel', 'my_event', quote)
        return render_template('success_quote.html', deal=deal)
    else:
        deal_id = request.args['deal_id']
        supplier_id = request.args['supplier_id']
        deal = Deal.query.filter_by(uuid=deal_id).first()
        return render_template('quote_form.html', deal_id=deal_id, supplier_id=supplier_id, deal=deal)

if __name__ == "__main__":
    application.debug = True
    application.run()
