import csv

from models import db, Supplier

filename = input('Port name: ')
file = open('%s.csv' % filename, 'r')

for f in csv.reader(file, delimiter=','):
	name = f[0].strip()
	emails = f[1].strip()
	supplier = Supplier(name, emails, filename.capitalize())
	db.session.add(supplier)
db.session.commit()