var express = require('express')
var fs = require('fs')
const Joi = require('joi')
const { Firestore, FieldValue } = require('@google-cloud/firestore')
const { v4: uuidv4 } = require('uuid')

const LATITUDE_MIN = -90
const LATITUDE_MAX = 90
const LONGITUDE_MIN = -180
const LONGITUDE_MAX = 180
const USER_COLLECTION = 'users'
const TOILET_COLLECTION = 'toilets'
const COMMENT_COLLECTION = 'comments'
const ANONYMOUS_USER = '00000000-0000-0000-0000-000000000000'

var app = express()
// Authenticate using ADC and backend secret key (stored in Git secret repo)
// see: https://cloud.google.com/docs/authentication/provide-credentials-adc#wlif-key
const firestore = new Firestore()

app.use(express.urlencoded())

// index GET
app.get('/', function(request, response) {
  console.log('GET /')
  var html = `
    <html>
        <body>
            Welcome to the flushfinder API :)
        </body>
    </html>`
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(html)
})

async function getAllToilets() {
  const data = []
  await firestore.collection(TOILET_COLLECTION).get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => data.push(doc.data()));
  });
  return data
}

// all data GEt
// /data/all
app.get('/data/all', async function(req, res) {
  getAllToilets()
    .then((data) => {
      complete_response = {
        response: 200,
        time: Date.now(),
        data: data,
      }
      res.writeHead(200, {'Content-Type': 'text/json'})
      res.end(JSON.stringify(complete_response))
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, {'Content-Type': 'text/json'})
      error_response = { response: 500, error: 'Error accessing data.' }
      res.end(JSON.stringify(error_response))
    })
})

// toilet GET
// /data/toilet/:id
app.get('/data/toilet/:id', function(req, res) {
  console.log('GET /data/toilet')
  console.dir(req.params.id)
  firestore.collection(TOILET_COLLECTION).doc(req.params.id).get()
    .then(snapshot => {
      if (!snapshot.exists) {
        res.writeHead(400, {'Content-Type': 'text/json'})
        error_response = { response: 400, error: 'Toilet does not exist.' }
        res.end(JSON.stringify(error_response))
        return
      }

      complete_response = {
        response: 400,
        time: snapshot.readTime.toDate(),
        data: snapshot.data()
      }

      res.writeHead(200, {'Content-Type': 'text/json'})
      res.end(JSON.stringify(complete_response))
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, {'Content-Type': 'text/json'})
      error_response = { response: 500, error: 'Error accessing data.' }
      res.end(JSON.stringify(error_response))
    })
})

// comment GET
// /data/comment?id1=<>&id2=<>
app.get('/data/comment', function(req, res) {
  console.log('GET /data/comment')
  if (!req.query.id) {
    res.writeHead(204, {'Content-Type': 'text/json'})
    empty_response = { response: 204, data: [] }
    res.end(JSON.stringify(empty_response))
    return
  }

  // Convert to array
  if (!Array.isArray(req.query.id)) {
    req.query.id = [req.query.id]
  }

  console.dir(req.query.id)

  const promises = [], data = [], invalid_ids = []
  req.query.id.forEach((id) => promises.push(requestAsync(id, data, invalid_ids)))
  Promise.all(promises)
    .then(() => {
      res.writeHead(200, {'Content-Type': 'text/json'})
      complete_response = { response: 200, time: Date.now(), data: data, invalid_ids: invalid_ids }
      res.end(JSON.stringify(complete_response))
    })
    .catch((err) => {
      console.log(err)
      res.writeHead(500, {'Content-Type': 'text/json'})
      error_response = { response: 500, error: 'Error accessing data.' }
      res.end(JSON.stringify(error_response))
    })
})

const requestAsync = async (id, data_arr, invalid_ids_arr) => {
  let docRef = firestore.collection(COMMENT_COLLECTION).doc(id)
  try {
    let snapshot = await docRef.get();
    if (!snapshot.exists) {
      invalid_ids_arr.push(id)
      return
    }

    data_arr.push(snapshot.data())
  } catch (err) {
    console.log(err)
    /*
    res.writeHead(500, {'Content-Type': 'text/json'})
    error_response = { response: 500, error: 'Error accessing data.' }
    res.end(JSON.stringify(error_response))
    */
    invalid_ids_arr.push(id)
  }
}

// create POST task
app.post('/create', function(req, res) {
  console.log('POST /create')
  console.dir(req.body)

  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
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
      'likes': [],
      'ratings': [],
      'attributes': [],
      'open': true,
      'comments': []
    }

    // Upload to firestore collection
    let collectionRef = firestore.collection(TOILET_COLLECTION)
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
  console.dir(req.body)

  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    name: Joi.string()
      .min(3)
      .max(30)
      .optional(),
    open: Joi.boolean().optional()
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    // Schema invalid
    res.writeHead(400, {'Content-Type': 'text/json'})
    error_response = { response: 400, error: `Validation error: ${error.details.map(x => x.message).join(', ')}` }
    res.end(JSON.stringify(error_response))
  } else {
    req.body = value

    // Search for toilet with the specified id
    let docRef = firestore.collection(TOILET_COLLECTION).doc(req.body.id)
    let doc = docRef.get()
      .then(snapshot => {
        if (!snapshot.exists) {
          res.writeHead(400, {'Content-Type': 'text/json'})
          error_response = { response: 400, error: 'Toilet does not exist.' }
          res.end(JSON.stringify(error_response))
          return
        }

        updates = {}

        // -- Update the doc with the editable attributes if they exist
        if (typeof(req.body.name) !== 'undefined') {
          updates.name = req.body.name
        }
    
        if (typeof(req.body.open) !== 'undefined') {
          updates.open = req.body.open
        }
        // -- End editable attributes
    
        docRef.update(updates)
          .then(writeResult => {
            complete_response = {
              response: 200,
              time: writeResult.writeTime.toDate(),
              updated: updates
            }
        
            res.writeHead(200, {'Content-Type': 'text/json'})
            res.end(JSON.stringify(complete_response))
          })
          .catch((err) => {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/json'})
            error_response = { response: 500, error: 'Error updating toilet.' }
            res.end(JSON.stringify(error_response))
          })
      })
      .catch((err) => {
        console.log(err)
        res.writeHead(500, {'Content-Type': 'text/json'})
        error_response = { response: 500, error: 'Error updating toilet.' }
        res.end(JSON.stringify(error_response))
      })
  }
})

// rate POST task
app.post('/rate', function(req, res) {
  console.log('POST /rate')
  console.dir(req.body)

  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    rating: Joi.number()
      .integer()
      .min(1)
      .max(5)
      .optional(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    // Schema invalid
    res.writeHead(400, {'Content-Type': 'text/json'})
    error_response = { response: 400, error: `Validation error: ${error.details.map(x => x.message).join(', ')}` }
    res.end(JSON.stringify(error_response))
  } else {
    req.body = value

    // Search for toilet with the specified id
    let docRef = firestore.collection(TOILET_COLLECTION).doc(req.body.id)
    let doc = docRef.get()
      .then(snapshot => {
        if (!snapshot.exists) {
          res.writeHead(400, {'Content-Type': 'text/json'})
          error_response = { response: 400, error: 'Toilet does not exist.' }
          res.end(JSON.stringify(error_response))
          return
        }

        docRef.update({ratings: FieldValue.arrayUnion(req.body.rating)})
          .then(writeResult => {
            complete_response = {
              response: 200,
              time: writeResult.writeTime.toDate(),
              updated: `Added rating ${req.body.rating}.`
            }
        
            res.writeHead(200, {'Content-Type': 'text/json'})
            res.end(JSON.stringify(complete_response))
          })
          .catch((err) => {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/json'})
            error_response = { response: 500, error: 'Error updating toilet.' }
            res.end(JSON.stringify(error_response))
          })
      })
      .catch((err) => {
        console.log(err)
        res.writeHead(500, {'Content-Type': 'text/json'})
        error_response = { response: 500, error: 'Error updating toilet.' }
        res.end(JSON.stringify(error_response))
      })
  }
})

// comment POST task
app.post('/comment', function(req, res) {
  console.log('POST /comment')
  console.dir(req.body)

  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    user: Joi.string().uuid().optional(),
    comment: Joi.string().min(1).max(100).required(),
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    // Schema invalid
    res.writeHead(400, {'Content-Type': 'text/json'})
    error_response = { response: 400, error: `Validation error: ${error.details.map(x => x.message).join(', ')}` }
    res.end(JSON.stringify(error_response))
  } else {
    req.body = value

    // Search for toilet with the specified id
    let docRef = firestore.collection(TOILET_COLLECTION).doc(req.body.id)
    let doc = docRef.get()
      .then(snapshot => {
        if (!snapshot.exists) {
          res.writeHead(400, {'Content-Type': 'text/json'})
          error_response = { response: 400, error: 'Toilet does not exist.' }
          res.end(JSON.stringify(error_response))
          return
        }

        // TODO validate user against user collection
        if (typeof(req.body.user) === 'undefined') {
          req.body.user = ANONYMOUS_USER;
        }

        new_comment = {
          id: uuidv4(),
          user: req.body.user,
          text: req.body.comment,
          time: Date.now()
        }

        // Add comment to comments collection
        comment_did_upload = true
        let collectionRef = firestore.collection(COMMENT_COLLECTION)
        let commentDoc = collectionRef.doc(new_comment.id)
        commentDoc.create(new_comment)
          .catch((err) => {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/json'})
            error_response = { response: 500, error: 'Could not write to database.' }
            res.end(JSON.stringify(error_response))
            comment_did_upload = false
          })
        if (!comment_did_upload) return // We already sent a response, exit prematurely

        docRef.update({comments: FieldValue.arrayUnion(new_comment.id)})
          .then(writeResult => {
            complete_response = {
              response: 200,
              time: writeResult.writeTime.toDate(),
              comment_time: new_comment.time,
              updated: `User ${req.body.user} added comment "${req.body.comment}" to toilet ${req.body.id}.`
            }
        
            res.writeHead(200, {'Content-Type': 'text/json'})
            res.end(JSON.stringify(complete_response))
          })
          .catch((err) => {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/json'})
            error_response = { response: 500, error: 'Error updating toilet.' }
            res.end(JSON.stringify(error_response))
          })
      })
      .catch((err) => {
        console.log(err)
        res.writeHead(500, {'Content-Type': 'text/json'})
        error_response = { response: 500, error: 'Error updating toilet.' }
        res.end(JSON.stringify(error_response))
      })
  }
})

// like POST task
app.post('/like', function(req, res) {
  console.log('POST /like')
  console.dir(req.body)

  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    user: Joi.string().uuid().optional()
  })

  const { error, value } = schema.validate(req.body)
  if (error) {
    // Schema invalid
    res.writeHead(400, {'Content-Type': 'text/json'})
    error_response = { response: 400, error: `Validation error: ${error.details.map(x => x.message).join(', ')}` }
    res.end(JSON.stringify(error_response))
  } else {
    req.body = value

    // Search for toilet with the specified id
    let docRef = firestore.collection(TOILET_COLLECTION).doc(req.body.id)
    let doc = docRef.get()
      .then(snapshot => {
        if (!snapshot.exists) {
          res.writeHead(400, {'Content-Type': 'text/json'})
          error_response = { response: 400, error: 'Toilet does not exist.' }
          res.end(JSON.stringify(error_response))
          return
        }

        // TODO validate user against user collection
        if (typeof(req.body.user) === 'undefined') {
          req.body.user = ANONYMOUS_USER;
        }

        new_like = {
          user: req.body.user,
          time: Date.now()
        }

        docRef.update({likes: FieldValue.arrayUnion(new_like)})
          .then(writeResult => {
            complete_response = {
              response: 200,
              time: writeResult.writeTime.toDate(),
              updated: `User ${req.body.user} liked toilet ${req.body.id}.`
            }
        
            res.writeHead(200, {'Content-Type': 'text/json'})
            res.end(JSON.stringify(complete_response))
          })
          .catch((err) => {
            console.log(err)
            res.writeHead(500, {'Content-Type': 'text/json'})
            error_response = { response: 500, error: 'Error updating toilet.' }
            res.end(JSON.stringify(error_response))
          })
      })
      .catch((err) => {
        console.log(err)
        res.writeHead(500, {'Content-Type': 'text/json'})
        error_response = { response: 500, error: 'Error updating toilet.' }
        res.end(JSON.stringify(error_response))
      })
  }
})

const port = 80
app.listen(port)
console.log(`Listening at http://localhost:${port}`)