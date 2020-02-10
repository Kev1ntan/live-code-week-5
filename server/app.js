require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)

app.listen(port,()=>{
  console.log(`Connected to port: ${port}`)
})