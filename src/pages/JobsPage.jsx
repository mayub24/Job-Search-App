import React from 'react'
import Jobs from '../components/Jobs'

const JobsPage = ({job_url, jobsChanged}) => {
  return (
    <>
      <section className='bg-blue-50 px-4 py-6'>
            <Jobs isJobsPage = {true} numberOfJobs={9999} job_url={job_url} jobsChanged={jobsChanged} />
      </section>
    </>
  )
}

export default JobsPage