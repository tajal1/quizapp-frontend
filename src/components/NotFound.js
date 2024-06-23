import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  message: {
    fontSize: '18px',
  },
};

export default NotFound;
