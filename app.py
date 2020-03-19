from flask import Flask, request, render_template
from mongoengine import *
import os
import csv

app = Flask(__name__)

app.config.from_object('config')

connect('country')

class Country(Document):
    name = StringField()

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    thisTitle = "Index"

    path = os.path.join(app.config ['FILES_FOLDER'], "data1.csv")
    f = open(path)
    r = csv.reader(f)
    d = list(r)

    for data in d:
        print(data)

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

@app.route('/countries', methods=['GET'])
@app.route('/countries/<country_id>', methods=['GET'])
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
