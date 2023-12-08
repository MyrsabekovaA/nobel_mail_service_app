const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const domainName = process.env.DOMAIN_NAME

app.listen(port, ()=>{
    console.log(`link to server: http://${domainName}/`)
})

module.exports = {app}