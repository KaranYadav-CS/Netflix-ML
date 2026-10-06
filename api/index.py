import os
import sys

# Add project root directory to sys.path so app.py and src modules can be imported
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from app import app

# Expose WSGI application instance for Vercel Serverless Functions
app = app
