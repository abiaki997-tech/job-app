const express=require('express')
const app=express()
const port=process.env.PORT ||3000;

app.listen(port,()=>{
  console.log(`server is up ${port}`)

})
// app.get('/jobs',(req,res)=>{
//   res.send('UP!!')
// })

var redis = require('redis'),
  client = redis.createClient()

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs',async(req,res)=>{
 
  const jobs = await getAsync('github');
  // console.log(JSON.parse(jobs).length);com
  res.header("Access-Control-Allow-Origin","https://job-abi.herokuapp.com/")
  return res.send(jobs)
})

