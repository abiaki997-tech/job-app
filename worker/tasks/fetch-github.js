var fetch = require('node-fetch')

var redis = require("redis"),
    client = redis.createClient()

const {promisify} = require('util');
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseURL='https://jobs.github.com/positions.json'

async function fetchGithub(){

  let resultCount=1, onPage=0;
  const allJobs=[]

  //fetch all pages
  while(resultCount>0 & allJobs.length<700){
    const res = await fetch(`${baseURL}?pages=${onPage}`)
    const jobs = await res.json()
    allJobs.push(...jobs)//single array spreading values
    resultCount=jobs.length;
    
    console.log(" got "+ jobs.length+" jobs")
    onPage--;
  }

  //filter algo
 const jijobs=allJobs.filter(job=>{
   const jobTitle=job.title.toLowerCase()

   if(
     jobTitle.includes('senior') ||
     jobTitle.includes('manager')||
     jobTitle.includes('Sr.') ||
     jobTitle.includes('architect')
    
    ) {
       return false;
     }
     return true;
 })
  //set in redis
 console.log("total jobs "+allJobs.length )
 console.log('filter '+jijobs.length)

 const success =await setAsync('github',JSON.stringify(jijobs) )

 console.log({success})
}



module.exports=fetchGithub