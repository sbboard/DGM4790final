const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbpass = require('./mondopass.js')

const dev_db_url = `mongodb+srv://buffum:${dbpass}@cluster0-yj7ng.mongodb.net/series`
const mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const product = require('./routes/product.route')

app.use('/api', product)

const port = (process.env.PORT || 8666)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})