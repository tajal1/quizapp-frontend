import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <div style={styles.navBar}>
      <div style={styles.logo}>
        <h2>Quiz Application</h2>
      </div>
      <div style={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <span onClick={handleLogout} style={styles.link}>Logout</span>
            <span style={styles.link}>
              <Link to="/question" style={styles.link}>Question</Link>
            </span>

            <span style={styles.link}>
              <Link to="/create-quiz" style={styles.link}>Create Quiz</Link>
            </span>
          </>


        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Registration</Link>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  logo: {
    fontSize: '1.5em',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em',
    cursor: 'pointer',
  },
};

export default NavBar;
