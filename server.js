//Server = Express
const express = require('express')
  const app = express()

//Middleware = Body Parser
const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Filesystem
const fs = require('fs')

//Customer Database
const customerFILE = 'customer_list.json'
  const customerPATH = `./customer/${customerFILE}`
  const customerJSON = require(customerPATH) //Read JSON file. Is this writeable as well?

//Get Method
app.get('/customer_list', (req, res) => res.json(customerJSON))

//Post Method
app.post('/customer_list', urlencodedParser, (req, res, next) => {
  const first = req.body.first
  const last = req.body.last
  const customerNEW = {
    id: customerJSON.length,
    name: {
      first: first,
      last: last
    }
  }

  customerJSON.push(customerNEW)
  fs.writeFileSync(customerPATH, JSON.stringify(customerJSON, null, 4))
  res.redirect('http://localhost:3000/SUCCESS')
  // fs.appendFileSync(customerPATH, JSON.stringify(customerNEW, null, 4)) //Unable to append to file's text in array
  //change the address to go back to the form
  next()
})

//Port Setup
const port = 5000
  app.listen(port, () => console.log(`Server started on port ${port}`))
