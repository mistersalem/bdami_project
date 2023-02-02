const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const userRoutes = require('./routes/users')
const bcrypt = require('bcrypt')

const indexRouter = require('./routes/index')
const customersRouter = require('./routes/customers')



//Basic setup of packages
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.set('views', __dirname +'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB setup
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://admin:admin@clusterbdami.xflmong.mongodb.net/bdami?retryWrites=true&w=majority")

// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParsel: true }) //from env vairabl url to db but not working

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to DB"))


app.use('routes/users/register', userRoutes)
app.use('/', indexRouter)
app.use('/customers', customersRouter)
app.use('/users', userRoutes)

app.listen(process.env.PORT || 3000)