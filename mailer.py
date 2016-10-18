import requests
from settings import APP_URL, MAILGUN_API_KEY, MAILGUN_APP

def send_message(supplier, deal):
	subject = "Request for Quote from %s" % (deal.buyer)
	link = "%s/send_quote?deal_id=%s&supplier_id=%s" % (APP_URL, deal.uuid, supplier.id)
	message = "This is a request for a quote from %s. Please follow this link to respond: %s" % (deal.buyer, link)
	return requests.post(
		"https://api.mailgun.net/v3/%s/messages" % MAILGUN_APP,
		auth=("api", MAILGUN_API_KEY),
		data={"from": "CommodityX <mailgun@sandboxdf65ab935f4644c28e2f811710a08f02.mailgun.org>",
			  "to": ['kcole16@gmail.com'],
			  "subject": subject,
			  "text": message})

def send_supplier_emails(suppliers, deal):
	for supplier in suppliers:
		send_message(supplier, deal)
