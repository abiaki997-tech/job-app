import React from 'react';
import './App.css';

import Jobs from './Jobs'

const JOB_URL='http://localhost:3001/jobs'

// const mockJobs=[
//   {title: 'SWE 1', company: 'Google'},
//   {title: 'SWE 1', company: 'Apple'},
//   {title: 'SWE 1', company: 'Facebook'}
// ]

async function fetchJobs(updateJobs){
  const res=await fetch(JOB_URL)
  const json=await res.json();

  updateJobs(json)
  // console.log(json)
}

function App() {

  const [joblist,updateJobs]=React.useState([])

  React.useEffect(()=>{
    fetchJobs(updateJobs)
  },[])

  return(
    <div className="App">
     <Jobs jobs={joblist}/>
    </div>
  ) 
}

export default App;
