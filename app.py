from flask import Flask, request, render_template
from mongoengine import *

app = Flask(__name__)

connect('country')

class Country(Document):
    name = StringField()

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    thisTitle = "Index"
    return render_template('index.html',title=thisTitle)

@app.route('/inspiration')
def inspiration():
    thisTitle = "Inspiration"
    return render_template('inspiration.html',title=thisTitle)

@app.route('/country')
def country():

    newCountry = Country(name='New Zealand')
    newCountry.save()

    return "Country added"

@app.route('/getCountries', methods=['GET'])
@app.route('/getCountries<country_id>', methods=['GET'])
def getCountries(country_id=None):

    country = None

    if country_id is None:
        country = Country.objects
    else:
        country = Country.objects.get(id=country_id)

    return country.to_json()

@app.route('/loadData')
def loadData():
    return "Success"

if __name__ =="__main__":
    app.run(debug=True,port=8080)
