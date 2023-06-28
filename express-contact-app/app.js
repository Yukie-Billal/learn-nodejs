const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// konfig flash
app.use(cookieParser('secret'))
app.use(session({
   cookie: { maxAge: 6000 },
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}))
app.use(flash())

module.exports = { app }

require('./routes/web')

app.listen(port, () => console.log(`Contact app listening on port ${port}!`))