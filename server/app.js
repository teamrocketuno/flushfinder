var express = require('express')
var fs = require('fs')
const { request } = require('http')
const Joi = require('joi')
const { Firestore } = require('@google-cloud/firestore')
const { v4: uuidv4 } = require('uuid')

var app = express()
// Authenticate using ADC and backend secret key (stored in Git secret repo)
// see: https://cloud.google.com/docs/authentication/provide-credentials-adc#wlif-key
const firestore = new Firestore()

app.use(express.urlencoded())

app.get('/', function(request, response) {
  console.log('GET /')
  var html = `
    <html>
        <body>
            <form method="post" action="http://localhost:3000">Name: 
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        </body>
    </html>`
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html)
})

const LATITUDE_MIN = -90
const LATITUDE_MAX = 90
const LONGITUDE_MIN = -180
const LONGITUDE_MAX = 180

// create POST task
app.post('/create', function(req, res) {
  console.log('POST /create')
  console.dir(req.body)

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number()
      .min(LATITUDE_MIN)
      .max(LATITUDE_MAX)
      .required(),
    longitude: Joi.number()
      .min(LONGITUDE_MIN)
      .max(LONGITUDE_MAX)
      .required(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    // Schema invalid
    res.writeHead(400, {'Content-Type': 'text/json'})
    error_response = { response: 400, error: `Validation error: ${error.details.map(x => x.message).join(', ')}` }
    res.end(JSON.stringify(error_response))
  } else {
    req.body = value

    // Generate random id for new toilet
    id = uuidv4()
    created_toilet = {
      'id': id,
      'name': req.body.name,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'likes': 0,
      'ratings': [],
      'attributes': [],
      'open': true,
      'comments': []
    }

    // Upload to firestore collection
    let collectionRef = firestore.collection('toilets')
    let doc = collectionRef.doc(id)
    doc.create(created_toilet)
    .then(writeResult => {
      complete_response = {
        response: 200,
        time: writeResult.writeTime.toDate(),
        toilet: created_toilet
      }
  
      res.writeHead(200, {'Content-Type': 'text/json'})
      res.end(JSON.stringify(complete_response))
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, {'Content-Type': 'text/json'})
      error_response = { response: 500, error: 'Could not write to database.' }
      res.end(JSON.stringify(error_response))
    })
  }
})

// edit POST task
app.post('/edit', function(req, res) {
  console.log('POST /edit')
})

// rate POST task
app.post('/rate', function(req, res) {
  console.log('POST /rate')
})

// comment POST task
app.post('/comment', function(req, res) {
  console.log('POST /comment')
})

// like POST task
app.post('/like', function(req, res) {
  console.log('POST /like')
})

app.post('/', function(req, res) {
  console.log('POST /')
  console.dir(req.body)
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(req.body.name)
})

const port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)


// Validates using JOI according to the schema, returns whether the value is valid and error if applicable
function validate(value, schema) {
  return {
    'valid': true,
    'error': "none"
  }
}