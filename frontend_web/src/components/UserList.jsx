import { useEffect, useState } from 'react';

const UserList = ({ currentUser, onLogout, onSwitchToLogin }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Personal Trainer App - Users</h1>
        {currentUser ? (
          <div style={styles.userInfo}>
            <span style={styles.welcome}>Welcome, {currentUser.username}!</span>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={onSwitchToLogin} style={styles.loginButton}>
            Login
          </button>
        )}
      </div>

      <div style={styles.content}>
        {loading ? (
          <p style={styles.message}>Loading users...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : users.length === 0 ? (
          <p style={styles.message}>No users found.</p>
        ) : (
          <div style={styles.tableContainer}>
            <h2 style={styles.subtitle}>User List ({users.length} users)</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={styles.row}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.username}</td>
                    <td style={styles.td}>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  title: {
    color: '#00d4aa',
    fontSize: '28px',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  welcome: {
    color: '#ccc',
    fontSize: '16px'
  },
  logoutButton: {
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  loginButton: {
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#00d4aa',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  message: {
    color: '#ccc',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '50px'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '50px'
  },
  tableContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
  },
  subtitle: {
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#333'
  },
  headerRow: {
    backgroundColor: '#00d4aa'
  },
  th: {
    border: '1px solid #555',
    padding: '12px',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  row: {
    backgroundColor: '#333',
    '&:hover': {
      backgroundColor: '#444'
    }
  },
  td: {
    border: '1px solid #555',
    padding: '12px',
    color: '#fff'
  }
};

export default UserList;