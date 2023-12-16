const {app} = require('./app.js')
const port = process.env.PORT
const domainName = process.env.DOMAIN_NAME
app.get('/', (req, res)=>{
    res.send('<h1>Your server works fine</h1>')
})

app.get('/api/mail-templates', (req, res)=>{
    res.send(JSON.stringify({
      "data": [{
        "id": 1,
        "name": "reminder",
        "googleDriveId": "Qwwkjr54-fdkjg"
    }]}))
})

app.post('/api/auth/login', (req,res)=>{
    if(req.body.password==="admin"
    && req.body.email==="admin") {
        res.send(JSON.stringify({
           token: "300bucks", user: { email: "luntik@p", name: "benedykt"}
        }))
    }
    else {
        throw Error("bebra")
    }
})

app.get("/api/contacts", (req,res)=>{
    res.send(JSON.stringify([{
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      },
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      },
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }
    ]))
})

app.post("/api/contacts", (req,res)=>{
    res.send(JSON.stringify([{
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      },
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      },
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }
    ]))
})

app.get("/api/contacts/1", (req,res)=>{
    res.send(JSON.stringify({
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      }))
})

app.get("/api/contacts/2", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.get("/api/contacts/4", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.put("/api/contacts/1", (req,res)=>{
    res.send(JSON.stringify({
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      }))
})

app.put("/api/contacts/2", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.put("/api/contacts/4", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.delete("/api/contacts/1", (req,res)=>{
    res.send(JSON.stringify({
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      }))
})

app.delete("/api/contacts/2", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.delete("/api/contacts/4", (req,res)=>{
    res.send(JSON.stringify(
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }))
})

app.post("/contacts/bulking-creation", (req,res)=>{
    res.send(JSON.stringify([{
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "age": 30,
        "country": "Canada",
        "timezone": "GMT-04:00",
        "sourceOfReferral": "Website",
        "eduQuestSelectedDateTime": "2023-10-03T15:45:00Z",
        "eduQuestDecision": "Pending"
      },
      {
        "id": 2,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      },
      {
        "id": 4,
        "firstName": "Bob",
        "lastName": "Smith",
        "email": "bob@example.com",
        "age": 28,
        "country": "United Kingdom",
        "timezone": "GMT+00:00",
        "sourceOfReferral": "Email",
        "eduQuestSelectedDateTime": "2023-10-03T14:15:00Z",
        "eduQuestDecision": "Rejected"
      }
    ]))
})

app.listen(port, ()=>{
  console.log(`link to server: http://${domainName}/`)
})