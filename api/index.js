const express = require('express')
// const animeapi = require('@justalk/anime-api');
const router = express.Router()
const app = express()

router.get('/',(req,res)=>{
  res.send("hello world")
})

app.use('/',router)
app.use('/gogoanime',require("./gogoanime"));


module.exports = app
