import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseconfig'; // Assuming you have the Firebase configuration in a separate file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // New state variable for error message
  const navigate = useNavigate();
  const auth = getAuth(app); 
  // Get the Auth instance from Firebase

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, username + '@gmail.com', password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        navigate('/bill'); // Redirect to '/bill' on successful login
      })
      .catch((error) => {
        // Handle login errors
        setError('Invalid username or password.'); // Set the error message
        console.log('Invalid login:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if exists */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-lg font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-lg font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
