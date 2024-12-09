import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import NavBar from './pages/NavBar';
import SubmissionPage from './pages/SubmissionPage';
import CreateTeamPage from './pages/CreateTeamPage';
import MCQPage from './pages/MCQPage';
const App: React.FC = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/submission" element={<SubmissionPage />} />
            <Route path="/create-team" element={<CreateTeamPage />} />
            <Route path="/mcq" element={<MCQPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;