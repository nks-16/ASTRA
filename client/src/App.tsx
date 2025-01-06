import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './pages/UserPage';
import NewSubmission from './pages/NewSubmission';
import PreviousSubmission from './pages/PreviousSubmission';
import InvestorPage from './pages/InvestorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/new-submission" element={<NewSubmission />} />
        <Route path="/previous-submissions" element={<PreviousSubmission />} />
        <Route path="/investor-page" element={<InvestorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
