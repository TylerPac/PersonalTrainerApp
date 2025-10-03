import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import './DashboardPage.css';

const DashboardPage = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisWeek: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await AuthService.getAllUsers();
      setUsers(data);
      
      // Calculate stats
      setStats({
        totalUsers: data.length,
        newUsersThisWeek: Math.floor(data.length * 0.2), // Mock calculation
        activeUsers: Math.floor(data.length * 0.8) // Mock calculation
      });
    } catch (error) {
      setError(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* Header */}
        <div className="dashboard-header" style={{ padding: 0 }}>
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-sub">Personal Trainer App Management</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div className="user-info">
              <div className="avatar">{currentUser?.username?.charAt(0)?.toUpperCase()}</div>
              <div style={{ marginLeft: 6 }}>
                <div style={{ color: '#fff', fontWeight: 700 }}>{currentUser?.username}</div>
                <div style={{ color: '#ccc', fontSize: 12 }}>{currentUser?.email}</div>
              </div>
            </div>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>👥</div>
            <div>
              <div className="stat-number">{stats.totalUsers}</div>
              <div style={{ color: '#ccc' }}>Total Users</div>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>🆕</div>
            <div>
              <div className="stat-number">{stats.newUsersThisWeek}</div>
              <div style={{ color: '#ccc' }}>New This Week</div>
            </div>
          </div>

          <div className="stat-card">
            <div style={{ fontSize: '2rem' }}>💪</div>
            <div>
              <div className="stat-number">{stats.activeUsers}</div>
              <div style={{ color: '#ccc' }}>Active Users</div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="table-section">
          <div className="table-header">
            <h2 style={{ color: '#fff', margin: 0 }}>All Users</h2>
            <button className="refresh-btn" onClick={fetchUsers}>🔄 Refresh</button>
          </div>

          {loading ? (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: '4px solid #333', borderTop: '4px solid #00d4aa', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
              <p style={{ color: '#ccc' }}>Loading users...</p>
            </div>
          ) : error ? (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <p style={{ color: '#ff6b6b' }}>{error}</p>
              <button onClick={fetchUsers} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#00d4aa' }}>Try Again</button>
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: 20 }}>📝</div>
              <p style={{ color: '#ccc', fontSize: 18 }}>No users found</p>
              <p style={{ color: '#666' }}>Users will appear here when they register</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table-styles">
                <thead>
                  <tr>
                    <th className="th">ID</th>
                    <th className="th">Avatar</th>
                    <th className="th">Username</th>
                    <th className="th">Email</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #333' }}>
                      <td className="td">{user.id}</td>
                      <td className="td">
                        <div style={{ width: 32, height: 32, background: '#00d4aa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', fontWeight: 700 }}>
                          {user.username?.charAt(0)?.toUpperCase()}
                        </div>
                      </td>
                      <td className="td">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {user.username}
                          {user.id === currentUser?.id && <span style={{ background: '#00d4aa', color: '#1a1a1a', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10 }}>You</span>}
                        </div>
                      </td>
                      <td className="td">{user.email}</td>
                      <td className="td"><span style={{ background: 'rgba(0,212,170,0.2)', color: '#00d4aa', fontSize: 12, fontWeight: 700, padding: '4px 8px', borderRadius: 12, border: '1px solid #00d4aa' }}>Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
    marginBottom: '40px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {},
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  title: {
    color: '#00d4aa',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  },
  subtitle: {
    color: '#ccc',
    fontSize: '16px',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#2a2a2a',
    padding: '10px 15px',
    borderRadius: '10px',
    border: '1px solid #333'
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#00d4aa',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  userName: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  userEmail: {
    color: '#ccc',
    fontSize: '12px'
  },
  logoutButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: '25px',
    borderRadius: '15px',
    border: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  statIcon: {
    fontSize: '2.5rem',
    opacity: 0.8
  },
  statContent: {},
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#00d4aa',
    lineHeight: 1
  },
  statLabel: {
    color: '#ccc',
    fontSize: '14px',
    marginTop: '5px'
  },
  tableSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    border: '1px solid #333',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px',
    borderBottom: '1px solid #333'
  },
  tableTitle: {
    color: '#fff',
    fontSize: '20px',
    margin: 0
  },
  refreshButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00d4aa',
    color: '#1a1a1a',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  loadingState: {
    padding: '60px',
    textAlign: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #333',
    borderTop: '4px solid #00d4aa',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  loadingText: {
    color: '#ccc',
    fontSize: '16px'
  },
  errorState: {
    padding: '60px',
    textAlign: 'center'
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '16px',
    marginBottom: '20px'
  },
  retryButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00d4aa',
    color: '#1a1a1a',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  emptyState: {
    padding: '60px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  emptyText: {
    color: '#ccc',
    fontSize: '18px',
    marginBottom: '10px'
  },
  emptySubtext: {
    color: '#666',
    fontSize: '14px'
  },
  tableContainer: {
    overflow: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  headerRow: {
    backgroundColor: '#333'
  },
  th: {
    padding: '15px',
    color: '#00d4aa',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '1px solid #444'
  },
  row: {
    borderBottom: '1px solid #333',
    transition: 'background-color 0.2s ease'
  },
  td: {
    padding: '15px',
    color: '#fff',
    borderBottom: '1px solid #333'
  },
  userAvatar: {
    width: '32px',
    height: '32px',
    backgroundColor: '#00d4aa',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  usernameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  youBadge: {
    backgroundColor: '#00d4aa',
    color: '#1a1a1a',
    fontSize: '10px',
    fontWeight: 'bold',
    padding: '2px 6px',
    borderRadius: '10px'
  },
  statusBadge: {
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    color: '#00d4aa',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '12px',
    border: '1px solid #00d4aa'
  }
};

export default DashboardPage;