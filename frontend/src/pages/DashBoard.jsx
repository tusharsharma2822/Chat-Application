import React, { useContext, useState } from 'react';
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const { user } = useContext(UserContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState('');
  const [isUserReady, setIsUserReady] = useState(false);
  const navigate = useNavigate();

  // Wait for user context to be available
  React.useEffect(() => {
    if (user && localStorage.getItem("token")) {
      setIsUserReady(true);
    } else {
      setIsUserReady(false);
    }
  }, [user]);

  async function createProject(e) {
    e.preventDefault();
    if (!isUserReady) return;
    try {
      await axios.post(
        "/projects/create",
        { name: projectName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(projectName);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      await axios.get("/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      // Optionally handle error, but always remove token and redirect
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  return (
    <main className="p-4 min-h-screen bg-black text-cyan-300 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div className='projects'>
          <button 
            onClick={() => isUserReady && setIsModalOpen(true)}
            className={`project p-4 border border-cyan-400 rounded-md px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700${!isUserReady ? ' opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isUserReady}
          >
            Create a New Project
            <i className="ri-link ml-2"></i>
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold ml-4"
        >
          Logout
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Create New Project</h2>
            <form onSubmit={createProject}>
              <label className="block mb-2 text-sm font-medium text-cyan-300">
                Project Name
              </label>
              <input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                type="text"
                className="w-full px-3 py-2 border border-cyan-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-800 text-white"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
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