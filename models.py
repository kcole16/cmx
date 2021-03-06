import datetime

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from passlib.hash import sha256_crypt

from server.settings import DATABASE_URL

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

db = SQLAlchemy(application)
migrate = Migrate(application, db)

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "Company(id='%s')" % self.id  


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120), unique=True)
    role = db.Column(db.String(120), unique=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship('Company',
                           backref=db.backref('companies', lazy='dynamic'))

    def __init__(self, email, password, role, company):
        self.email = email
        self.password = sha256_crypt.encrypt(password)
        self.role = role
        self.company = company

    def __str__(self):
        return "User(id='%s')" % self.id


class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), unique=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship('Company',
                           backref=db.backref('company_deals', lazy='dynamic'))
    uuid = db.Column(db.String(120), unique=True)
    port = db.Column(db.String(120), unique=False)
    vessel = db.Column(db.String(120), unique=False)
    imo = db.Column(db.String(120), unique=False)
    loa = db.Column(db.String(120), unique=False)
    buyer = db.Column(db.String(120), unique=False)
    orderedBy = db.Column(db.String(120), unique=False)
    grossTonnage = db.Column(db.String(120), unique=False)
    additionalInfo = db.Column(db.String(120), unique=False)
    eta = db.Column(db.String(120), unique=False)
    etd = db.Column(db.String(120), unique=False)
    portCallReason = db.Column(db.String(120), unique=False)
    agent = db.Column(db.String(120), unique=False)
    currency = db.Column(db.String(120), unique=False)
    location = db.Column(db.String(120), unique=False)
    status = db.Column(db.String(120), unique=False)
    voyage = db.Column(db.String(120), default=None)
    trade = db.Column(db.String(120), default=None)

    def __init__(self, user_email, company, uuid, port, vessel, imo, loa, buyer, orderedBy,
                 grossTonnage, additionalInfo, eta, etd, portCallReason, agent,
                 currency, location, status, voyage, trade):
        self.user_email = user_email
        self.company = company
        self.uuid = uuid
        self.port = port
        self.vessel = vessel
        self.imo = imo
        self.loa = loa
        self.buyer = buyer
        self.orderedBy = orderedBy
        self.grossTonnage = grossTonnage
        self.additionalInfo = additionalInfo
        self.eta = eta
        self.etd = etd
        self.portCallReason = portCallReason
        self.agent = agent
        self.currency = currency
        self.location = location
        self.status = status
        self.voyage = voyage
        self.trade = trade

    def __str__(self):
        return "Deal(id='%s')" % self.id


class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=False)
    port = db.Column(db.String(120), unique=False)

    def __init__(self, name, email, port):
        self.name = name
        self.email = email
        self.port = port

    def __str__(self):
        return "Supplier(id='%s')" % self.id


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    grade = db.Column(db.String(120), unique=False)
    quantity = db.Column(db.String(120), unique=False)
    spec = db.Column(db.String(120), unique=False)
    maxSulphur = db.Column(db.String(120), unique=False)
    unit = db.Column(db.String(120), unique=False)
    comments = db.Column(db.String(120), unique=False)
    deal_id = db.Column(db.Integer, db.ForeignKey('deal.id'))
    deal = db.relationship('Deal',
                           backref=db.backref('orders', lazy='dynamic'))
    delivery_date = db.Column(db.String(120), unique=False, default=None)
    volume_delivered = db.Column(db.String(120), unique=False, default=None)
    declared_density = db.Column(db.String(120), unique=False, default=None)
    actual_density = db.Column(db.String(120), unique=False, default=None)
    sulphur_delivered = db.Column(db.String(120), unique=False, default=None)

    def __init__(self, grade, quantity, spec, maxSulphur, unit, comments, deal):
        self.grade = grade
        self.quantity = quantity
        self.spec = spec
        self.maxSulphur = maxSulphur
        self.unit = unit
        self.comments = comments
        self.deal = deal

    def __str__(self):
        return "Order(id='%s')" % self.id


class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    validity = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=False)
    phone = db.Column(db.String(120), unique=False)
    skype = db.Column(db.String(120), unique=False)
    info = db.Column(db.String(240), unique=False)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    supplier = db.relationship('Supplier',
                               backref=db.backref('quotes', lazy='dynamic'))
    deal_id = db.Column(db.Integer, db.ForeignKey('deal.id'))
    deal = db.relationship('Deal',
                           backref=db.backref('quotes', lazy='dynamic'))
    accepted = db.Column(db.Boolean(), default=False)
    voyage = db.Column(db.String(120), default=None)
    rating = db.Column(db.String(120), default=None)
    rating_reason = db.Column(db.String(120), default=None)
    rating_comment = db.Column(db.String(120), default=None)

    def __init__(self, validity, email, phone, skype, info, supplier, deal):
        self.validity = validity
        self.email = email
        self.phone = phone
        self.skype = skype
        self.info = info
        self.supplier = supplier
        self.deal = deal

    def __str__(self):
        return "Quote(id='%s')" % self.id


class Price(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.String(120), unique=False)
    terms = db.Column(db.String(120), unique=False)
    physical = db.Column(db.String(120), unique=False)
    delivery = db.Column(db.String(120), unique=False)
    quote_id = db.Column(db.Integer, db.ForeignKey('quote.id'))
    quote = db.relationship('Quote',
                           backref=db.backref('prices', lazy='dynamic'))
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    order = db.relationship('Order',
                           backref=db.backref('prices', lazy='dynamic'))

    def __init__(self, price, terms, physical, delivery, quote, order):
        self.price = price
        self.terms = terms
        self.physical = physical
        self.delivery = delivery
        self.quote = quote
        self.order = order

    def __str__(self):
        return "Price(id='%s')" % self.id
