const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./keys')
const app = express()

mongoose.connect(keys.MONGO_URI)
  .then(() => { console.log('MongoDB connected...') })
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

module.exports = app
