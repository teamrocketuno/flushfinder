const { response } = require('express')
var express = require('express')
var fs = require('fs')
const { request } = require('http')
const Joi = require('joi')
var app = express()

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
    complete_response = {
      response: 200,
      toilet: {
        id: 0,
        name: req.body.name,
        latitiude: req.body.latitude,
        longitude: req.body.longitude,
        likes: 0,
        ratings: [],
        attributes: [],
        open: true,
        comments: []
      },
    }
    res.writeHead(200, {'Content-Type': 'text/json'})
    res.end(JSON.stringify(complete_response))
  }
})

// edit POST task
app.post('/edit', function(request, response) {
  console.log('POST /edit')
})

// rate POST task
app.post('/rate', function(request, response) {
  console.log('POST /rate')
})

// comment POST task
app.post('/comment', function(request, response) {
  console.log('POST /comment')
})

// like POST task
app.post('/like', function(request, response) {
  console.log('POST /like')
})

app.post('/', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(request.body.name)
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