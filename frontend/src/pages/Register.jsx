import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Backend expects fullname as an object with firstname and lastname
      await axios.post("/users/register", {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email,
        password
      }).then((res) => {
        setLoading(false);  
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user)
        navigate("/dashboard");
      })
      
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // Show first validation error if available
        const errors = err.response.data.errors;
        setError(Array.isArray(errors) ? errors[0].msg || errors[0].message || JSON.stringify(errors[0]) : JSON.stringify(errors));
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-sans">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <span className="bg-cyan-400 rounded-full w-10 h-10 flex items-center justify-center text-black font-extrabold text-2xl mr-2">C</span>
          <span className="text-cyan-400 text-2xl font-bold font-sans">ChatApp</span>
        </div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Register</h2>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
              <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="text-cyan-400 hover:underline font-medium">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;