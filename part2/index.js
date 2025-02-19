const express = require('express')
const app = express()
const port = 2000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.send('About this App!')
})

app.get('/weather', (req, res) => {
    res.send('It is cold !')
  })
  

app.listen(port, () => {
  const today = new Date();  
  console.log(`Example app listening on port ${port}  ${today}`)
})