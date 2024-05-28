from flask import Flask, render_template, request #Flask request is for data from client to server
import requests #requests is to make HTTP request to other sites for API use
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()


app = Flask(__name__)

@app.route("/") #methods=['GET']
def index():
   return render_template("index.html")

@app.route('/getStockOutlookData', methods=['GET'])
def getStockOutlookData():
    headers = {
        'Content-Type': 'application/json',
        'Authorization' : f'Token {os.getenv('Token')}'
         }
    input_stock = request.args.get("data")
    print (input_stock)
    response = requests.get(f"https://api.tiingo.com/tiingo/daily/{input_stock}", headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result
    else:
        return response.json()
    

@app.route('/getStockSummaryData', methods=['GET'])
def getStockSummaryData():
    headers = {
         'Content-Type': 'application/json',
         'Authorization' : f'Token {os.getenv('Token')}'
         }
    input_stock = request.args.get("data")
    #make "data" capitalized in JS
    print (input_stock)
    response = requests.get(f"https://api.tiingo.com/iex/?tickers={input_stock}&token=8d842a989065c24fa5cbbe6bb54ddbe2764c08d0", headers=headers)

    if response.status_code == 200:
        result = response.json()
        return result
    
    else:
        return response.json()

if __name__ == '__main__': 
    configure()
    app.run(debug=False)
