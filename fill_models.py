import csv

from models import db, Supplier, User, Company

db.drop_all()
db.create_all()

singapore = open('server/singapore.csv', 'r')
gibraltar = open('server/gibraltar.csv', 'r')
malta = open('server/malta.csv', 'r')

for f in csv.reader(singapore, delimiter=','):
    name = f[0].strip()
    emails = f[1].strip()
    supplier1 = Supplier(name, emails, 'Singapore')
    db.session.add(supplier1)

for f in csv.reader(gibraltar, delimiter=','):
    name = f[0].strip()
    emails = f[1].strip()
    supplier2 = Supplier(name, emails, 'Gibraltar')
    db.session.add(supplier2)

for f in csv.reader(malta, delimiter=','):
    name = f[0].strip()
    emails = f[1].strip()
    supplier3 = Supplier(name, emails, 'Malta')
    db.session.add(supplier3)

swire = Company('Swire Bulk')
oilfront = Company('OilFront')
db.session.add(swire)
db.session.add(oilfront)
db.session.commit()

buyer = User('buyer@oilfront.com', 'testbuyer', 'buyer', swire)
operator = User('operator@oilfront.com', 'testoperator', 'operator', swire)
admin = User('admin', '123', 'buyer', oilfront)

db.session.add(buyer)
db.session.add(operator)
db.session.add(admin)
db.session.commit()