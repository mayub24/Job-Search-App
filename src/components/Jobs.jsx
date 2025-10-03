import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import EachJob from './EachJob';
import NoAvailableJobs from './NoAvailableJobs';


const Jobs = ({isJobsPage = false, title = "Browse Jobs", numberOfJobs = 3, job_url }) => {
    const changeTitle =  isJobsPage ? `${title} on Job Page` : `${title} on Home Page`;

    const [jobs, setJobs] = useState([]);
    const [loader, setLoader] = useState(true);

    console.log(job_url);
    

    useEffect(() => {

      // you need a function inside useEffect
      const fetchJobs = async () => {
        
        try {
          const res = await fetch(`${job_url}/jobs?_limit=${numberOfJobs}`);
          const data = await res.json();
          setJobs(data);
        } catch (error) {
          console.log('Error in fetching data', error);
        } finally {
          setLoader(false);
        }
      }

      fetchJobs();
      

    }, []);


  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {changeTitle}
        </h2>

              {loader ? (
        <Spinner loadValue={loader} />
      ) : jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((eachJob) => (
            <EachJob eachSingleJob={eachJob} key={eachJob.id} />
          ))}
        </div>
      ) : (
        <NoAvailableJobs />
      )}
      </div>

    </section>
  )
}

export default Jobs