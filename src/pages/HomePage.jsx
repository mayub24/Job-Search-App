import React from 'react'
import Hero from "../components/Hero";
import Jobs from "../components/Jobs";
import ViewAllJobs from "../components/ViewAllJobs";
import Devs from "../components/Devs";


const HomePage = () => {

    const title = "Become a React Dev";
    const subtitle = "Find the React job that fits your skills";

  return (
    <>
    <Hero title = {title} subtitle={subtitle} />
    <Devs />
    <Jobs />
    <ViewAllJobs />
    </>
  )
}

export default HomePage