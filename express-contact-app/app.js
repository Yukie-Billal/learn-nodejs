const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded())

const { getContacts, findContact, addContact } = require('./utils/contacts.js')

app.get('/', (req, res) => {
   var mahasiswa = 'Yukie Billal';
   res.render('index', {
      title: 'Home',
      layout: 'partials/app-layout',
      mahasiswa : mahasiswa
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

app.get('/contact/add', (req, res) => {
   res.render('contact-add', {
      title : 'Add Contact',
      layout : 'partials/app-layout'
   })
})

app.post('/contact', (req, res) => {
   const add = addContact(req.body)
   res.send("Success")
})

app.get('/contact/:nama', (req, res) => {
   const nama = req.params.nama
   const contact = findContact(nama)
   res.render('contact-detail', {
      title: 'Detail Contact',
      layout: 'partials/app-layout',
      contact
   })
})
app.use('/', (req, res) => {
   res.send('<h1>404</h1>')
})

app.listen(port, () => console.log(`Contact app listening on port ${port}!`))