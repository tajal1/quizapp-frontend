import React from 'react';

const WelcomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to our quiz application v.10</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '2em',
    color: '#333',
  },
};

export default WelcomePage;
