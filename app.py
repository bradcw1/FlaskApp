from flask import Flask, request, render_template
from mongoengine import *
from flask_cors import CORS
import os, csv

app = Flask(__name__)
CORS(app)

app.config.from_object('config')

connect('country')

class Country(Document):
    name = StringField()
    data = DictField()

class Error(Document):
    id = StringField()
    message = StringField()

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

    newCountry = Country(name='Zimbabwe')
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
        try:
            country = Country.objects.get(name=country_name)
            return country.to_json(), 200
        except DoesNotExist:
            error = {"error": {"code":404, "message": "country not found"}}
            return error, 404

@app.route('/placeholderPOST', methods=['POST'])
def placeholderPOST():

    return "something"

@app.route('/countries/<country_name>', methods=['DELETE'])
def deleteCountry(country_name=None):

    return "something"
    

@app.route("/loadData")
def loadData():

    for file in os.listdir(app.config['FILES_FOLDER']):
        filename = os.fsdecode(file)
        path = os.path.join(app.config['FILES_FOLDER'],filename)
        f = open(path)
        r = csv.DictReader(f)
        d = list(r)
        for data in d:

            country = Country()
            dict = {}

            for key in data:
                if key == "country":
                    found = Country.objects(name=data[key]).count()

                    if found == 0:
                        country['name'] = data[key]

                    else:
                        country = Country.objects.get(name=data[key])
                        dict = country['data']

                else:
                    f = filename.replace(".csv","")
                    if f in dict:
                        #dict["deathrate"]["1970"] = "32.19"
                        dict[f][key] = data[key]
                    else:
                        dict[f] = {key:data[key]}

                country["data"] = dict

            country.save()

    return "Done"

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('404.html'), 500

if __name__ =="__main__":
    app.run(debug=True,host='0.0.0.0',port=8080)
