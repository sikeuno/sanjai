import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './component/LoginFrom';
import Bill from './component/Bill';

// Import the functions you need from the SDKs you need


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
