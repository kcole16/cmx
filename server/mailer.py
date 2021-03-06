import requests
import json
from .settings import APP_URL, MAILGUN_API_KEY, MAILGUN_APP, SENDGRID_API_KEY

def send_message(supplier, deal, orders, buyer):
    subject = "Request for Quote from %s" % (buyer)
    link = "%s/send_quote?deal_id=%s&supplier_id=%s" % (APP_URL, deal.id, supplier.id)
    order_html = ''
    ordered_by = ''
    headers = {
        'Authorization': 'Bearer %s' % SENDGRID_API_KEY,
        'Content-Type': 'application/json'
    }
    if deal.orderedBy:
        ordered_by = '(Handled on behalf of operator by %s)' % deal.orderedBy
    for order in orders:
        order_html += '%s %s %s %s %s<br>' % (order['grade'], order['quantity'], 
            order['unit'], order['spec'], order['comments'])
    message = '<p>%s<br>Bunker Enquiry<br><br>Please Offer:<br>%s (IMO: %s) (LOA: %s m) (GT: %s MT)<br>%s<br>@ %s (%s)<br>ETA %s<br>ETD %s<br><br><a href=%s>Click here</a> to submit a price.<br><br>%s<br><br>%s<br><br>Best Regards,<br><br>John Smith<br>Bunkers<br>OilFront Limited<br>PHONE +44 5555555555 <br>MOBILE +44 5555555555<br>Skype oilfront<br><a href="www.oilfront.com">www.oilfront.com</a></p>' % (buyer, deal.vessel, deal.imo, deal.loa, deal.grossTonnage, order_html, deal.port, deal.location, deal.eta, deal.etd, link, ordered_by, deal.additionalInfo)
    data = {
        'personalizations': [{
            'to': [{
                'email': 'kcole16@gmail.com'
            }, {
                'email': 'danny@oilfront.com'
            }]
        }],
        'from': {
            'email': 'OilFront <info@oilfront.com>'
        },
        'subject': subject,
        'content': [{
            'type': 'text/html',
            'value': message
        }]
    }
    return requests.post(
        "https://api.sendgrid.com/v3/mail/send",
        data=json.dumps(data),
        headers=headers)


def new_signup(email):
    message = "%s signed up" % email
    return requests.post(
        "https://api.mailgun.net/v3/%s/messages" % MAILGUN_APP,
        auth=("api", MAILGUN_API_KEY),
        data={"from": "OilFront <mailgun@sandboxdf65ab935f4644c28e2f811710a08f02.mailgun.org>",
              "to": ['kendall@oilfront.com'],
              "subject": "New Signup",
              "html": message})


def send_supplier_emails(suppliers, deal, orders, buyer):
    for supplier in suppliers:
        print(supplier)
        message = send_message(supplier, deal, orders, buyer)
        print(message.text)


# curl --request POST \
#   --url https://api.sendgrid.com/v3/mail/send \
#   --header 'Authorization: Bearer YOUR_API_KEY' \
#   --header 'Content-Type: application/json' \
#   --data 


#   '{
#     "personalizations": [{
#         "to": [{
#             "email": "your.email@example.com"
#         }]
#     }],
#     "from": {
#         "email": "example@example.com"
#     },
#     "subject": "Hello, World!",
#     "content": [{
#         "type": "text/plain", 
#         "value": "Heya!"
#     }]
# }'



