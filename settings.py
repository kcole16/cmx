import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

DATABASE_URI=os.environ.get("DATABASE_URI")
MAILGUN_API_KEY=os.environ.get("MAILGUN_API_KEY")
MAILGUN_APP=os.environ.get("MAILGUN_APP")
