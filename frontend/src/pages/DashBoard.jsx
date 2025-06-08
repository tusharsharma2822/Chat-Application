import React, { useContext, useState } from 'react';
import { UserContext } from "../context/user.context";
import axios from "../config/axios";

const DashBoard = () => {

  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('');

  function createProject(e) {
    e.preventDefault();

    axios.post("/projects/create", {
      name: projectName
    }).then((res) => {
      console.log(res);
      setIsModalOpen(false)
    }).catch((error) => {
      console.log(error)
    })

    console.log({ projectName });
  }

  return (
    <main className='p-4'>
      <div className='projects'>
        <button 
          onClick={() => setIsModalOpen(true)}
          className='project p-4 border border-slate-400 rounded-md mt-6 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700'>
          Create a New Project
          <i className="ri-link ml-2"></i>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            <form
              onSubmit={createProject}
            >
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default DashBoard