import requests
from settings import MAILGUN_API_KEY, MAILGUN_APP

def send_message(supplier, deal):
	subject = "Request for Quote from %s" % (deal.buyer)
	link = "http://localhost:5000/send_quote?deal_id=%s&supplier_id=%s" % (deal.uuid, supplier.id)
	message = "This is a request for a quote from %s. Please follow this link to respond: %s" % (deal.buyer, link)
	return requests.post(
		"https://api.mailgun.net/v3/%s/messages" % MAILGUN_APP,
		auth=("api", MAILGUN_API_KEY),
		data={"from": "CommodityX <mailgun@sandboxdf65ab935f4644c28e2f811710a08f02.mailgun.org>",
			  "to": [supplier.email],
			  "subject": subject,
			  "text": message})

def send_supplier_emails(suppliers, deal):
	for supplier in suppliers:
		send_message(supplier, deal)
