import os

def getenv(key):
   val = os.environ.get(key)
   if val:
       return val
   elif os.path.isfile('.env'):
       f = open('.env')
       s = f.read()
       f.close()
       for line in s.strip().split('\n'):
           k, v = line.split('=')
           if k == key:
               return v
   return None

APP_URL=getenv("APP_URL")
DATABASE_URL=getenv("DATABASE_URL")
MAILGUN_API_KEY=getenv("MAILGUN_API_KEY")
MAILGUN_APP=getenv("MAILGUN_APP")
SENDGRID_API_KEY=getenv("SENDGRID_API_KEY")
PRODUCTION=getenv("PRODUCTION")
S3_ACCESS_KEY=getenv("S3_ACCESS_KEY")
S3_SECRET_KEY=getenv("S3_SECRET_KEY")
