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

DATABASE_URI=getenv("DATABASE_URI")
MAILGUN_API_KEY=getenv("MAILGUN_API_KEY")
MAILGUN_APP=getenv("MAILGUN_APP")
