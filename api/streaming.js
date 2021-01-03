const bodyParser = require('body-parser')
const app = require('express')()
const animeapi = require('@justalk/anime-api');

app.use(bodyParser.json())

app.get('/',(req,res)=>{
  //console.log("request received")
  res.send("hello world")
})

app.get('/stream', (req, res) => {
  //const stream = await animeapi.stream(req.params.anime);
  console.log("request received")
  res.send({ data: 'data' })
})

module.exports = app