const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))


const { getContacts } = require('./utils/contacts.js')

app.get('/', (req, res) => {
   res.render('index', {
      title: 'Home',
      layout: 'partials/app-layout'
   })
})
app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      layout: 'partials/app-layout'
   })
})
app.get('/contact', (req, res) => {
   res.render('contact', {
      title: 'Contact',
      layout: 'partials/app-layout',
      contacts: getContacts()
   })
})
app.use('/', (req, res) => {
   res.send('<h1>404</h1>')
})

app.listen(port, () => console.log(`Contact app listening on port ${port}!`))