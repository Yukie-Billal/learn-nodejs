const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;
const morgan = require('morgan')
// Third party middleware

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(morgan('dev'))
// Built in middleware     / middleware punyanya express
app.use(express.static('public'))

// Application middleware
app.use((req, res, next) => {
   console.log(`Time : ${Date.now()}`);
   next()
})


app.get('/', (req, res) => {
   const mahasiswa = [
      {
         nama: "Yukie",
         email: "yukie@gmail.com"
      },
      {
         nama: "Billal",
         email: "billal@gmail.com"
      },
      {
         nama: "Fadhil",
         email: "fadhil@gmail.com"
      }
   ]
   res.render('index', {
      title: 'Home',
      mahasiswa,
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
      layout: 'partials/app-layout'
   })
})
app.use('/', (req, res) => {
   res.send('<h1>404</h1>')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))