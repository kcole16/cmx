import requests
from settings import APP_URL, MAILGUN_API_KEY, MAILGUN_APP

def send_message(supplier, deal, orders):
	subject = "Request for Quote from %s" % (deal.buyer)
	link = "%s/send_quote?deal_id=%s&supplier_id=%s" % (APP_URL, deal.uuid, supplier.id)
	print(link)
	order_html = ''
	ordered_by = ''
	if deal.orderedBy:
		ordered_by = '(Handled on behalf of operator by %s)' % deal.orderedBy
	for order in orders:
		order_html += '%s %s %s %s %s<br>' % (order['grade'], order['quantity'], 
			order['unit'], order['specification'], order['comments'])
	message = '<p>%s<br>Bunker Enquiry<br><br>Please Offer:<br>%s (IMO: %s) (LOA: %s m) (GT: %s MT)<br>%s<br>@ %s (%s)<br>ETA %s<br>ETD %s<br><br><a href=%s>Click here</a> to submit a price.<br><br>%s<br><br>%s<br><br>Best Regards,<br><br>Mike Ball<br>Manager Bunkers<br>Gearbulk (uk) Ltd., 1. London Bridge, Tooley Street. London SE1 9BG<br>PHONE +44 20 79406909 <br>MOBILE +44 7775 822 957<br>Skype mike.ball.gb<br><a href="www.gearbulk.com">www.gearbulk.com</a></p>' % (deal.buyer, deal.vessel, deal.imo, deal.loa, deal.grossTonnage, order_html, deal.port, deal.location, deal.eta, deal.etd, link, ordered_by, deal.additionalInfo)
	return requests.post(
		"https://api.mailgun.net/v3/%s/messages" % MAILGUN_APP,
		auth=("api", MAILGUN_API_KEY),
		data={"from": "OilFront <mailgun@sandboxdf65ab935f4644c28e2f811710a08f02.mailgun.org>",
			  "to": ['kcole16@gmail.com'],
			  "subject": subject,
			  "html": message})

def new_signup(email):
	message = "%s signed up" % email
	return requests.post(
		"https://api.mailgun.net/v3/%s/messages" % MAILGUN_APP,
		auth=("api", MAILGUN_API_KEY),
		data={"from": "OilFront <mailgun@sandboxdf65ab935f4644c28e2f811710a08f02.mailgun.org>",
			  "to": ['kendall@oilfront.com', 'danny@oilfront.com'],
			  "subject": "New Signup",
			  "html": message})

def send_supplier_emails(suppliers, deal, orders):
	print(orders)
	for supplier in suppliers:
		print(supplier)
		send_message(supplier, deal, orders)
