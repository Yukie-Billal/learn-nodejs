const express = require('express')
const app = express()


app.route('/', (req, res) => {
   res.send('Hello world')
})

app.listen(3000, '0.0.0.0', () => console.log("App running"))