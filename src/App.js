import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginFrom';
import Bill from './component/Bill';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyDafOcw_3dppKYb-WfuKmIWBZ705L7CXcU",
  authDomain: "aqua-44225.firebaseapp.com",
  projectId: "aqua-44225",
  storageBucket: "aqua-44225.appspot.com",
  messagingSenderId: "752634166529",
  appId: "1:752634166529:web:b02232efc29ade8854af00",
  measurementId: "G-P7QDK59145"
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </Router>
  );
};

export default App;
