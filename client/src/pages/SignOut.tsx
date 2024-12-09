import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the JWT token
    localStorage.removeItem('token');
    // Redirect to login
    navigate('/');
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Only render the sign-out button if logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <button onClick={handleSignOut} style={styles.signOutButton}>
      Sign Out
    </button>
  );
};

const styles = {
  signOutButton: {
   backgroundColor: '#s74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',

    // Default styling for larger screens
  },

  // Media Queries for responsiveness
  '@media (max-width: 768px)': {
    signOutButton: {
      padding: '0.3rem 0.8rem',  // Smaller padding on mobile devices
      fontSize: '0.9rem',  // Adjust font size for smaller screens
    },
  },

  '@media (max-width: 480px)': {
    signOutButton: {
      padding: '0.3rem 0.6rem',  // Further reduce padding for very small screens
      fontSize: '0.8rem',  // Smaller font size on very small screens
    },
  },
};

export default SignOut;
