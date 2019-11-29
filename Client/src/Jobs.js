import React from 'react';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Job from './Job'
import JobsModel from './Jobs-Model'


function Jobs({jobs}){
  //modals
  const [open, setOpen] = React.useState(false);
  const [selectedJobs,selectJobs]=React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //pagination
  const numjobs=jobs.length;
  const numpages=Math.ceil(numjobs/100)

  const [activeStep, setActiveStep] = React.useState(0);

  const JobsOnPage=jobs.slice(activeStep * 20 ,(activeStep * 20)+20)

  //step 0 show (0 to 49)
  //step 1 show (50 to 99)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
return(
  <div className="jobs">
    <JobsModel open={open} job={selectedJobs} handleClose={handleClose}/>
    <Typography variant="h4" component="h1">
       Entry Level Software Jobs
    </Typography> 
    <Typography variant="h6" component="h2">
         Found {numjobs} Jobs
    </Typography> 
    {
       JobsOnPage.map(
         (job,i) => < Job key={i} job={job} onClick={()=> {
          handleClickOpen();
          selectJobs(job)
            } } />
            )
    } 

    <div>
      Page {activeStep} of {numpages-1}
    </div>
      <MobileStepper
      variant="progress"
      steps={numpages}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
         <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
   
  </div>
  
)

}

export default Jobs

// jobs.map((job) => < Job job={job} />)