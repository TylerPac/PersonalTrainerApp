import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import './DashboardPage.css';

const DashboardPage = ({ currentUser, onLogout }) => {
  // Mock data for now - will be replaced with real API calls later
  const [workoutPlan] = useState({
    title: "Today's Workout Plan: Leg Day",
    exercises: [
      { name: "Calf Raises", sets: 4, reps: 20, weight: 45, rest: "30 Secs", notes: "Each Set is per leg Make sure to squeeze at the top of each rep.", completed: false },
      { name: "Calf Raises", sets: 4, reps: 20, weight: 45, rest: "30 Secs", notes: "Each Set is per leg Make sure to squeeze at the top of each rep.", completed: false },
      { name: "Calf Raises", sets: 4, reps: 20, weight: 45, rest: "30 Secs", notes: "Each Set is per leg Make sure to squeeze at the top of each rep.", completed: false },
      { name: "Calf Raises", sets: 4, reps: 20, weight: 45, rest: "30 Secs", notes: "Each Set is per leg Make sure to squeeze at the top of each rep.", completed: false },
      { name: "Calf Raises", sets: 4, reps: 20, weight: 45, rest: "30 Secs", notes: "Each Set is per leg Make sure to squeeze at the top of each rep.", completed: false }
    ]
  });

  const [nutritionData] = useState({
    calories: { current: 1600, goal: 2000, exercise: 600, remaining: 1000 },
    macros: {
      carbs: { current: 70, target: 30, color: "#ff6b6b" },
      fats: { current: 70, target: 30, color: "#ffa500" },
      protein: { current: 50, target: 40, color: "#00d4aa" },
      water: { current: 60, target: 60, color: "#4da6ff" }
    }
  });
 
  const handleWorkoutComplete = (index) => {
    // Logic to mark workout as complete will go here
    console.log(`Exercise ${index} completed`);
  };

  const handleMealIdeas = (mealType) => {
    // Logic to show meal ideas will go here
    console.log(`Show meal ideas for ${mealType}`);
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

        {/* Metrics Row */}
        <div className="metrics-row">
          {/* Calories Card */}
          <div className="metric-card calories-card">
            <div className="metric-header">
              <h3>Calories</h3>
              <span className="goal-label">Base Goal</span>
              <span className="goal-value">{nutritionData.calories.goal}</span>
            </div>
            <div className="progress-circle-container">
              <svg className="progress-circle" width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="8" fill="none" />
                <circle cx="60" cy="60" r="50" stroke="#00d4aa" strokeWidth="8" fill="none" 
                        strokeDasharray={`${2 * Math.PI * 50}`} 
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - (nutritionData.calories.current / nutritionData.calories.goal))}`}
                        strokeLinecap="round" transform="rotate(-90 60 60)" />
              </svg>
              <div className="circle-text">
                <span className="current-calories">{nutritionData.calories.current}</span>
                <span className="remaining-text">remaining</span>
              </div>
            </div>
            <div className="metric-details">
              <div className="detail-row">
                <span>Food</span>
                <span>{nutritionData.calories.current}</span>
              </div>
              <div className="detail-row">
                <span>Exercise</span>
                <span>{nutritionData.calories.exercise}</span>
              </div>
              <div className="detail-row">
                <span>Remaining</span>
                <span>{nutritionData.calories.remaining}</span>
              </div>
            </div>
          </div>

          {/* Macros Cards */}
          <div className="macros-container">
            <h3>Macros</h3>
            <div className="macro-circles">
              <div className="macro-item">
                <svg className="macro-circle" width="80" height="80">
                  <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="30" stroke={nutritionData.macros.carbs.color} strokeWidth="6" fill="none" 
                          strokeDasharray={`${2 * Math.PI * 30}`} 
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - (nutritionData.macros.carbs.current / 100))}`}
                          strokeLinecap="round" transform="rotate(-90 40 40)" />
                </svg>
                <div className="macro-overlay-text">{nutritionData.macros.carbs.current}g</div>
                <span className="macro-label">Carbs {nutritionData.macros.carbs.target}%</span>
              </div>
              <div className="macro-item">
                <svg className="macro-circle" width="80" height="80">
                  <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="30" stroke={nutritionData.macros.fats.color} strokeWidth="6" fill="none" 
                          strokeDasharray={`${2 * Math.PI * 30}`} 
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - (nutritionData.macros.fats.current / 100))}`}
                          strokeLinecap="round" transform="rotate(-90 40 40)" />
                </svg>
                <div className="macro-overlay-text">{nutritionData.macros.fats.current}g</div>
                <span className="macro-label">Fats {nutritionData.macros.fats.target}%</span>
              </div>
              <div className="macro-item">
                <svg className="macro-circle" width="80" height="80">
                  <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="30" stroke={nutritionData.macros.protein.color} strokeWidth="6" fill="none" 
                          strokeDasharray={`${2 * Math.PI * 30}`} 
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - (nutritionData.macros.protein.current / 100))}`}
                          strokeLinecap="round" transform="rotate(-90 40 40)" />
                </svg>
                <div className="macro-overlay-text">{nutritionData.macros.protein.current}g</div>
                <span className="macro-label">Protein {nutritionData.macros.protein.target}%</span>
              </div>
              <div className="macro-item">
                <svg className="macro-circle" width="80" height="80">
                  <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="30" stroke={nutritionData.macros.water.color} strokeWidth="6" fill="none" 
                          strokeDasharray={`${2 * Math.PI * 30}`} 
                          strokeDashoffset={`${2 * Math.PI * 30 * (1 - (nutritionData.macros.water.current / 100))}`}
                          strokeLinecap="round" transform="rotate(-90 40 40)" />
                </svg>
                <div className="macro-overlay-text">{nutritionData.macros.water.current}g</div>
                <span className="macro-label">Water {nutritionData.macros.water.target}%</span>
              </div>
            </div>
          </div>

          {/* Message Card */}
          <div className="message-card">
            <h3>Message from your trainer</h3>
            <div className="message-content">
              {/* Placeholder for trainer message */}
            </div>
          </div>
        </div>

        {/* Workout Plan Table */}
        <div className="workout-section">
          <div className="workout-header">
            <h2>{workoutPlan.title}</h2>
            <button className="feedback-btn">Feedback</button>
          </div>
          
          <div className="workout-table-container">
            <table className="workout-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>Rest</th>
                  <th>Notes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workoutPlan.exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td>{exercise.name}</td>
                    <td>{exercise.sets}</td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.weight}</td>
                    <td>{exercise.rest}</td>
                    <td>{exercise.notes}</td>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={exercise.completed}
                        onChange={() => handleWorkoutComplete(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Meal Planning Section */}
        <div className="meals-section">
          <div className="meal-cards">
            <div className="meal-card">
              <h3>Breakfast</h3>
              <div className="meal-info">
                <div className="meal-stat">
                  <span className="label">Calories</span>
                  <span className="range">400 - 500</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Protein</span>
                  <span className="target">&gt;=</span>
                  <span className="value">25g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Carbs</span>
                  <span className="range">-</span>
                  <span className="value">40g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Fats</span>
                  <span className="target">&lt;=</span>
                  <span className="value">12g</span>
                </div>
              </div>
              <button className="meal-btn" onClick={() => handleMealIdeas('breakfast')}>Meal Ideas</button>
            </div>

            <div className="meal-card">
              <h3>Lunch</h3>
              <div className="meal-info">
                <div className="meal-stat">
                  <span className="label">Calories</span>
                  <span className="range">400 - 500</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Protein</span>
                  <span className="target">&gt;=</span>
                  <span className="value">25g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Carbs</span>
                  <span className="range">-</span>
                  <span className="value">40g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Fats</span>
                  <span className="target">&lt;=</span>
                  <span className="value">12g</span>
                </div>
              </div>
              <button className="meal-btn" onClick={() => handleMealIdeas('lunch')}>Meal Ideas</button>
            </div>

            <div className="meal-card">
              <h3>Dinner</h3>
              <div className="meal-info">
                <div className="meal-stat">
                  <span className="label">Calories</span>
                  <span className="range">400 - 500</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Protein</span>
                  <span className="target">&gt;=</span>
                  <span className="value">25g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Carbs</span>
                  <span className="range">-</span>
                  <span className="value">40g</span>
                </div>
                <div className="meal-stat">
                  <span className="label">Fats</span>
                  <span className="target">&lt;=</span>
                  <span className="value">12g</span>
                </div>
              </div>
              <button className="meal-btn" onClick={() => handleMealIdeas('dinner')}>Meal Ideas</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default DashboardPage;