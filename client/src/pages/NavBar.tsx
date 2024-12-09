import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from './SignOut'; // Import the SignOut component

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Hackathon</h1>
      <div className="md:hidden" style={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>
      <div style={{ ...styles.links, ...(isMenuOpen ? styles.openMenu : {}) }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? '#e74c3c' : 'transparent', // Active link styling
            fontWeight: isActive ? 'bold' : 'normal', // Bold font for active
          })}
        >
          Home
        </NavLink>
        <NavLink 
          to="/login" 
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? '#e74c3c' : 'transparent',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Login
        </NavLink>
        <NavLink 
          to="/signup" 
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? '#e74c3c' : 'transparent',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Sign Up
        </NavLink>
        <NavLink 
          to="/dashboard" 
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? '#e74c3c' : 'transparent',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Dashboard
        </NavLink>
        
        {/* Conditionally render SignOut button */}
        <SignOut />
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    backgroundColor: '#34495e',
    padding: '1rem 2rem',
    color: '#ecf0f1',
    position: 'relative' as 'relative',
    zIndex: 5, // Ensure nav is on top
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex' as 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as 'wrap', // Wrap on smaller screens
    transition: 'transform 0.3s ease-in-out',
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  menuIcon: {
    display: 'none', // Hidden on larger screens
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#ecf0f1',
  },
  openMenu: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    position: 'absolute' as 'absolute',
    top: '4rem',
    left: 0,
    right: 0,
    backgroundColor: '#34495e',
    padding: '1rem 0',
    gap: '1rem',
    zIndex: 10,
  },
  // Media Queries
  '@media (max-width: 768px)': {
    navbar: {
      flexDirection: 'column' as 'column', // Stack items in column for small screens
      alignItems: 'flex-start' as 'flex-start',
    },
    links: {
      display: 'none', // Hide links by default on mobile
    },
    menuIcon: {
      display: 'block', // Show the menu icon on small screens
    },
    openMenu: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      position: 'absolute',
      top: '4rem',
      left: '0',
      right: '0',
      backgroundColor: '#34495e',
      padding: '1rem 0',
    },
    link: {
      textAlign: 'center' as 'center', // Center links in the mobile menu
      fontSize: '1.2rem',
      padding: '1rem 0',
    },
  },
};

export default NavBar;
