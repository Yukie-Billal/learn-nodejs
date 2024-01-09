import express from 'express'

const app = express()

app.post('/auth', (req, res) => {
  res.send({})
})

export default app
