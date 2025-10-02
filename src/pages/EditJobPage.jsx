import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'

const EditJobPage = ({ updateJobListing }) => {

    const singleJob = useLoaderData();
    const navigate = useNavigate();
    const { id } = useParams();


    const [title, setTitle] = useState('');
    const [type, setType] = useState('Full-time');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('Under $50K');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    useEffect(() => {
        if (singleJob) {
            setTitle(singleJob.title);
            setType(singleJob.type);
            setLocation(singleJob.location);
            setDescription(singleJob.description);
            setSalary(singleJob.salary);
            setCompanyName(singleJob.company?.name || '');
            setCompanyDescription(singleJob.company?.description || '');
            setContactEmail(singleJob.company?.contactEmail || '');
            setContactPhone(singleJob.company?.contactPhone || '');
        }
}, [singleJob]);


    const setVal = (e) => {
        e.preventDefault();
        
        const { name, value } = e.target;

        switch (name) {
        case 'title':
            setTitle(value);
            break;
        case 'type':
            setType(value);
            break;
        case 'location':
            setLocation(value);
            break;
        case 'description':
            setDescription(value);
            break;
        case 'salary':
            setSalary(value);
            break;
        case 'companyName':
            setCompanyName(value);
            break;
        case 'companyDescription':
            setCompanyDescription(value);
            break;
        case 'contactEmail':
            setContactEmail(value);
            break;
        case 'contactPhone':
            setContactPhone(value);
            break;
        default:
            break;
        }       
    }

    const updateJob = (e) => {
        e.preventDefault();

        // mapping the format of our api to submit a post request
        const updatedJob = {
            id,
            title,
            type,
            location,
            description,
            salary,
            company: {
                name: companyName,
                description: companyDescription,
                contactEmail,
                contactPhone
      }
        }

          updateJobListing(updatedJob);

          return navigate(`/jobs/${id}`);
    }  

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0"
        >
          <form onSubmit={updateJob}>
            <h2 className="text-3xl text-center font-semibold mb-6">Update Job</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                id="type"
                name="type"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                value={type}
                onChange={setVal}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label
              >
              <input
                type="text"
                id="title"
                name="title"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                placeholder="eg. Beautiful Apartment In Miami"
                value={title}
                onChange={setVal}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description
            </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={description}
                onChange={setVal}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Salary</label
              >
              <select
                id="salary"
                name="salary"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                required
                value={salary}
                onChange={setVal}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                placeholder='Company Location'
                required
                value={location}
                onChange={setVal}           
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                placeholder="Company Name"
                value={companyName}
                onChange={setVal}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
                >Company Description</label
              >
              <textarea
                id="companyDescription"
                name="companyDescription"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                rows="4"
                placeholder="What does your company do?"
                value={companyDescription}
                onChange={setVal}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
                >Contact Email</label
              >
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                placeholder="Email address for applicants"
                required
                value={contactEmail}
                onChange={setVal}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
                >Contact Phone</label
              >
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                className="border border-gray-300 rounded-md w-full py-2 px-3 mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-100 transition"
                placeholder="Optional phone for applicants"
                value={contactPhone}
                onChange={setVal}
              />
            </div>

            <div>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditJobPage