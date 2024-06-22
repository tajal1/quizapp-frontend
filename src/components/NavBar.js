import React from 'react';

const NavBar = () => {
  return (
    <div style={styles.navBar}>
      <div style={styles.logo}>
        <h2>Quiz Application</h2>
      </div>
      <div style={styles.navButtons}>
        <button style={styles.button} >Login</button>
        <button style={styles.button}>Registration</button>
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
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#282c34',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NavBar;
