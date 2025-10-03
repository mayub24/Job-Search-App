import React, {useState} from "react"
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useParams} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import AddJob from "./pages/AddJob";
import NotFound from "./pages/NotFound";
import SingleJob, { jobLoader } from "./pages/SingleJob";
import AddNewJob from "./pages/AddNewJob";
import EditJobPage from "./pages/EditJobPage";

const App = () => {

  const API_URL =
  import.meta.env.PROD
    ? "https://job-search-app-n274.onrender.com/api"
    : "/api";


  // Add New Job
  const addJob = async (newJob) => {
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      }) 
      return;
}

// delete job
const deletingJob = async (id, singleJob) => {
  console.log(id);
  
  try {    
    const res = await fetch(`${API_URL}/jobs/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) {
           console.error("Failed to delete job:", res.status);
            alert(`Could not delete ${singleJob.title}.`);
           return false;
        }
        else {
          console.log("Job deleted successfully: ", singleJob);
          alert(`Job ${singleJob.title} has been deleted.`);
          return true;
        }
  } catch (error) {
    console.error("Error deleting job:", err);
    return false;
  }    
}

// Update job
const updateJob = async (updatedInfo) => {
 const res = await fetch(`${API_URL}/jobs/${updatedInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInfo)
      }) 
      return;
}

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path="/" element = {<MainLayout />}>
      <Route path='/' element = {<HomePage job_url={API_URL} />} />
      <Route path='/jobs' element = {<JobsPage />} />
      <Route path='/jobs/:id' element={<SingleJob deleteJob={deletingJob} />} loader={jobLoader} />
      <Route path='/add-job' element={<AddNewJob addJobSubmit={addJob} />} />
      <Route path='/add-job' element = {<AddJob />} />
      <Route path='/jobs/edit/:id' element = {<EditJobPage updateJobListing={updateJob} />} loader={jobLoader} />
      <Route path='*' element = {<NotFound />} />
    </Route>
)
);

return <RouterProvider router={router}/>

}



export default App;