// check if we are in production mode,
// then do not load the env variable
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

const app = express()
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
// tell express where our static files will be
app.use(express.static('public'))

const mongoose = require('mongoose')
// I was getting errors in connecting to mongnDB
// solution ?
// Task Manager -> mongoDB -> started it (it was stopped)
mongoose.connect('mongodb://localhost/mybrary', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error)=>{
    console.log(error)
})
// if connected to mongoDB atleast once successfully
db.once('open', ()=>{
    console.log("Connected to MongoDB :)")
})

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server up at : ", 3000)
})