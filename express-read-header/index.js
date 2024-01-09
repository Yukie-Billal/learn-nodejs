import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.json(req.headers)
})

app.listen(3000, () => {console.log('3000')})
