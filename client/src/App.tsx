import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/Signup';
import NewSubmission from './pages/NewSubmission';
import HomePage from './pages/Homepage';
import NavBar from './pages/NavBar';
// import PreviousSubmission from './pages/PreviousSubmission';
// import InvestorPage from './pages/InvestorPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes (User Area) */}
        <Route path="/user" element={<UserPage />} />
        <Route path="/new-submission" element={<NewSubmission />} />
        
        {/* Add more protected routes as needed */}
        {/* <Route path="/previous-submissions" element={<PreviousSubmission />} /> */}
        {/* <Route path="/investor-page" element={<InvestorPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
