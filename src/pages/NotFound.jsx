import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate('/'); // fallback
  }
};

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className='text-yellow-400 text-8xl mb-4'/>
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <button
        onClick={handleGoBack}
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >Go Back
      </button>
    </section>
  )
}

export default NotFound