import React from 'react'
import Jobs from '../components/Jobs'

const JobsPage = ({job_url}) => {
  return (
    <>
      <section className='bg-blue-50 px-4 py-6'>
            <Jobs isJobsPage = {true} numberOfJobs={10} job_url={job_url} />
      </section>
    </>
  )
}

export default JobsPage