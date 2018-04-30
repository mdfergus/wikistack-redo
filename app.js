const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const { db } = require('./models');

const app = express()

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, "./public")))
app.use(bodyParser.urlencoded({extended: false}))

const layout = require('./views/layout')


app.get('/', (req, res) => {
  res.send(layout("Helloooooo!!"))
})



module.exports = app
