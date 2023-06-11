const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.sendFile('./index.html', { root: __dirname })
})
app.get('/about', (req, res) => {
   res.send('Ini Adalah Halaman About')
})
app.get('/Contact/:id', (req, res) => {
   res.send(`Ini Adalah Halaman Contact dengan id ${req.params.id}`)
})
app.use('/product', (req, res) => {
   res.send(`Produk dengan id ${req.query.name} dan kategori ${req.query.category}`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))