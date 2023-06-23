const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { body, check, validationResult } = require('express-validator')
const { getContacts, findContact, addContact, checkDuplikat, deleteContact } = require('./utils/contacts.js')
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


app.get('/', (req, res) => {
   var mahasiswa = 'Yukie Billal';
   res.render('index', {
      title: 'Home',
      layout: 'partials/app-layout',
      mahasiswa: mahasiswa
   })

})
app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      layout: 'partials/app-layout'
   })
})
app.get('/contact', (req, res) => {
   const contacts = getContacts()
   res.render('contact', {
      title: 'Contact',
      layout: 'partials/app-layout',
      contacts,
      msg: req.flash("msg")

   })
})

app.get('/contact/add', (req, res) => {
   res.render('contact-add', {
      title: 'Add Contact',
      layout: 'partials/app-layout'
   })
})

app.post('/contact', [
   body('nama').custom((value) => {
      const duplikat = checkDuplikat(value)
      if (duplikat) {
         throw new Error("Nama contact sudah digunakan")
      }
      return true
   }),
   check('email', 'Email Tidak Valid!').isEmail(),
   check('nohp', 'No hp Tidak Valid').isMobilePhone('id-ID')
], (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      res.render('contact-add', {
         title: 'Add Contact',
         layout: 'partials/app-layout',
         errors: errors.array()
      })
   } else {
      const add = addContact(req.body)
      req.flash("msg", "Data Contact Berhasil Ditambahkan!")
      res.redirect('/contact')
   }
})

app.get("/contact/delete/:nama", (req, res) => {
   const contact = findContact(req.params.nama)
   if (!contact) {
      res.status(404)
      res.send("404")
   } else {
      const deleted = deleteContact(req.params.nama)
      if (deleted) {
         req.flash("msg", "Data Contact Berhasil Dihapus!")
         res.redirect('/contact')
      } else {
         req.flash("msg", "Data Contact Gagal Dihapus!")
         res.redirect(`/contact:${req.params.nama}`)
      }
   }
})

app.get('/contact/:nama', (req, res) => {
   const nama = req.params.nama
   const contact = findContact(nama)
   res.render('contact-detail', {
      title: 'Detail Contact',
      layout: 'partials/app-layout',
      contact,
      'msg': req.flash("msg")
   })
})
app.use('/', (req, res) => {
   res.send('<h1>404</h1>')
})

app.listen(port, () => console.log(`Contact app listening on port ${port}!`))