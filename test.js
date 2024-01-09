const express = require('express')
const app = express()
const port = 5501


// app.get('/', (req, res) => {
//   res.send('Hello World!!')
// })

app.get('/', function(req,res) {
  const path = require('path')
  app.use('/static', express.static(path.join(__dirname, 'public')))
})
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})