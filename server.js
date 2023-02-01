// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }            //try with env vairable

const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

//Basic setup of packages
app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//DB setup
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://admin:admin@clusterbdami.xflmong.mongodb.net/bdami?retryWrites=true&w=majority")

// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParsel: true }) //from env vairabl url to db but not working

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to DB"))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)