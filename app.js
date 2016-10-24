'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const Config = require('./config.js');
var FB = require('./connectors/facebook')
// var Bot = require('./bot')
app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a Liasion')
})

app.get('/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

// for Facebook verification
app.post('/webhook/', function (req, res) {
  var entry = FB.getMessageEntry(req.body)
  if (entry && entry.message) {
    if (entry.message.attachments) {
      FB.newMessage(entry.sender.id, "I can't read attachments yet!")
    } else {
      FB.newMessage(entry.sender.id, 'cool, bro');
    }
  }
  res.sendStatus(200)
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
