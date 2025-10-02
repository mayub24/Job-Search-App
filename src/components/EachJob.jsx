import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { FaMapMarker } from 'react-icons/fa'

const EachJob = ({eachSingleJob}) => {

  const [showFullDescription, setShowFullDescription] = useState(false);

  let extraText = showFullDescription ? 'Show Less' : 'Show More';

  let textColor = showFullDescription ? 'text-red-500' : 'text-indigo-600';

  let description = eachSingleJob.description;

  if (!showFullDescription) {
      description = description.substring(0, 100) + '...';
  } else if (showFullDescription) {
    description = eachSingleJob.description;
  }

  return (
        <div className='bg-white rounded-lg shadow-md relative' key={eachSingleJob.id}>
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">{eachSingleJob.type}</div>
                <h3 className="text-xl font-bold">{eachSingleJob.title}</h3>
              </div>

              <div>
               {description}
              </div>

              <p className={`text-sm py-2 ${textColor} hover:cursor-pointer`} onClick={() => setShowFullDescription((prevState) => !prevState)}>
                  {extraText}
              </p>

              <h3 className="text-indigo-500 mb-2">{eachSingleJob.salary}</h3>

              <div className="border border-gray-100 mb-5"></div>

              <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-orange-700 mb-3">
                  <FaMapMarker className="inline mr-2" />
                  {eachSingleJob.location}
                </div>

                <Link
                  to= {`/jobs/${eachSingleJob.id}`}
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                 Read More
                </Link>
              </div>
            </div>
            </div>
  )
}

export default EachJob