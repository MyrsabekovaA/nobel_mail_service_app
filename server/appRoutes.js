const {app} = require('./app.js')

app.get('/', (req, res)=>{
    res.send('<h1>Your server works fine</h1>')
})