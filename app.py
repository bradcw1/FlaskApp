from flask import Flask, request, render_template
from mongoengine import *
import os, csv, bson

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

    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
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

    newCountry = Country(name='Afghanistan')
    newCountry.save()

    return "Country added"

@app.route('/countries', methods=['GET'])
@app.route('/countries/<country_name>', methods=['GET'])
def getCountries(country_name=None):

    country = None

    if country_name is None:
        country = Country.objects

        return country.to_json(), 200
    else:
        if Country.objects.get(name=country_name):
            country = Country.objects.get(name=country_name)
            return country.to_json(), 200
        else:
            return country_name + " does not exist", 404

@app.route('/placeholderPOST', methods=['POST'])
def placeholderPOST():

    return "something"

@app.route('/placeholderDELETE', methods=['DELETE'])
def placeholderDELETE():

    return "something"

@app.route('/loadData')
def loadData():
    return "Success"

if __name__ =="__main__":
    app.run(debug=True,port=8080)
