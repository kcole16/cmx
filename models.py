from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from passlib.hash import sha256_crypt

from settings import DATABASE_URI

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://fc131f658f39b82d84cadb8fb4f6b8dc:ec224d27d943493e9382c6a87b58f942@leader.postgres.discoverd:5432/be84d1b4d08b9c9822edffbe8d93efd1'

db = SQLAlchemy(application)
migrate = Migrate(application, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120), unique=True)

    def __init__(self, email, password):
        self.email = email
        self.password = sha256_crypt.encrypt(password)

    def __str__(self):
        return "User(id='%s')" % self.id


class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(120), unique=True)
    port = db.Column(db.String(120), unique=False)
    vessel = db.Column(db.String(120), unique=False)
    imo = db.Column(db.String(120), unique=False)
    po = db.Column(db.String(120), unique=False)
    buyer = db.Column(db.String(120), unique=False)
    vesselType = db.Column(db.String(120), unique=False)
    requisition = db.Column(db.String(120), unique=False)
    orderedBy = db.Column(db.String(120), unique=False)
    eta = db.Column(db.String(120), unique=False)
    etd = db.Column(db.String(120), unique=False)
    portCallReason = db.Column(db.String(120), unique=False)
    agent = db.Column(db.String(120), unique=False)
    currency = db.Column(db.String(120), unique=False)

    def __init__(self, uuid, port, vessel, imo, po, buyer, vesselType, 
    	requisition, orderedBy, eta, etd, portCallReason, agent, currency):
        self.uuid = uuid
        self.port = port
        self.vessel = vessel
        self.imo = imo
        self.po = po
        self.buyer = buyer
        self.vesselType = vesselType
        self.requisition = requisition
        self.orderedBy = orderedBy
        self.eta = eta
        self.etd = etd
        self.portCallReason = portCallReason
        self.agent = agent
        self.currency = currency

    def __str__(self):
        return "Deal(id='%s')" % self.id


class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __str__(self):
        return "Supplier(id='%s')" % self.id


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quality = db.Column(db.String(120), unique=False)
    quantity = db.Column(db.String(120), unique=False)
    spec = db.Column(db.String(120), unique=False)
    maxSulphur = db.Column(db.String(120), unique=False)
    unit = db.Column(db.String(120), unique=False)
    deal_id = db.Column(db.Integer, db.ForeignKey('deal.id'))
    deal = db.relationship('Deal',
        backref=db.backref('orders', lazy='dynamic'))

    def __init__(self, quality, quantity, spec, maxSulphur, unit, deal):
        self.quality = quality
        self.quantity = quantity
        self.spec = spec
        self.maxSulphur = maxSulphur
        self.unit = unit
        self.deal = deal

    def __str__(self):
        return "Order(id='%s')" % self.id


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.String(120), unique=False)
    dates = db.Column(db.String(120), unique=False)
    terms = db.Column(db.String(120), unique=False)
    expiration = db.Column(db.String(120), unique=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    supplier = db.relationship('Supplier',
        backref=db.backref('quotes', lazy='dynamic'))
    deal_id = db.Column(db.Integer, db.ForeignKey('deal.id'))
    deal = db.relationship('Deal',
        backref=db.backref('quotes', lazy='dynamic'))

    def __init__(self, price, dates, terms, expiration, supplier, deal):
        self.price = price
        self.dates = dates
        self.terms = terms
        self.expiration = expiration
        self.supplier = supplier
        self.deal = deal

    def __str__(self):
        return "Quote(id='%s')" % self.id