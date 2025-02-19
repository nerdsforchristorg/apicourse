
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/web', (req, res) => {
    res.send(`<h1>Hello World!</h1>
         <p>
         <ol> 
          <li>Item 1</li>
          <li>Item 2</li>
         </ol>
        `)
  })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      