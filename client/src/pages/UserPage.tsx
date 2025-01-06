import React from 'react';
import { Link } from 'react-router-dom';

const UserPage = () => {
  return (
    <div>
      <h1>Welcome, User</h1>
      <div>
        <Link to="/new-submission">New Submission</Link>
        <br />
        <Link to="/previous-submissions">Previous Submissions</Link>
      </div>
    </div>
  );
};

export default UserPage;
