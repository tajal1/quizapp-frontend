import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h1>Profile</h1>
      <div style={styles.profileData}>
        <div style={styles.profileItem}><strong>Username:</strong> {userData.username}</div>
        <div style={styles.profileItem}><strong>Email:</strong> {userData.email}</div>
        <div style={styles.profileItem}><strong>Positive Score:</strong> {userData.positive_score}</div>
        <div style={styles.profileItem}><strong>Negative Score:</strong> {userData.negetive_score}</div>
        <div style={styles.profileItem}><strong>Score:</strong> {userData.score}</div>
        <div style={styles.profileItem}><strong>Rank:</strong> {userData.rank}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  profileData: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
};

export default Profile;
