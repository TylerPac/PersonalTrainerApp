import './DashboardContent.css';

const DashboardContent = ({ currentUser }) => {
  // Mock data for dashboard
  const stats = [
    { label: 'Total Workouts', value: 'running', icon: '🏃‍♂️', color: '#ff6b6b' },
    { label: 'Current Streak', value: '5', icon: '⚡', color: '#ffa500' },
    { label: 'This Week', value: '40,689', icon: '👥', color: '#4da6ff' }
  ];

  const workoutData = [
    { day: 'Mon', value: 20 },
    { day: 'Tue', value: 35 },
    { day: 'Wed', value: 25 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 55 },
    { day: 'Sun', value: 40 }
  ];

  return (
    <div className="dashboard-content">
      {/* Message Card */}
      <div className="message-section">
        <div className="message-card-dash">
          <h3>Message from your trainer</h3>
          <div className="message-content-dash">
            <p>Keep up the great work! Your consistency is showing excellent results.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-dash" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Chart */}
      <div className="chart-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Workouts added</h3>
            <select className="chart-filter">
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>
          <div className="chart-container">
            <div className="chart-grid">
              {/* Y-axis labels */}
              <div className="y-axis">
                {[100, 80, 60, 40, 20, 0].map((value) => (
                  <div key={value} className="y-label">{value}%</div>
                ))}
              </div>
              
              {/* Chart bars */}
              <div className="chart-bars">
                {workoutData.map((data, index) => (
                  <div key={index} className="bar-container">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${data.value}%`,
                        background: index === 3 ? '#00d4aa' : '#4da6ff' // Highlight Thursday
                      }}
                    ></div>
                    <div className="bar-label">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="actions-section">
        <div className="action-buttons">
          <button className="action-btn primary">Start Workout</button>
          <button className="action-btn secondary">Log Food</button>
          <button className="action-btn secondary">View Progress</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;