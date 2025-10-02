import React from 'react'
import Jobs from '../components/Jobs'

const JobsPage = () => {
  return (
    <>
      <section className='bg-blue-50 px-4 py-6'>
            <Jobs isJobsPage = {true} numberOfJobs={10}  />
      </section>
    </>
  )
}

export default JobsPage