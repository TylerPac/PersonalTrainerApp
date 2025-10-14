import { useState } from 'react';
import './WorkoutContent.css';

const WorkoutContent = ({ currentUser }) => {
  const [workoutPlan] = useState({
    title: "Today's Workout Plan: Leg Day",
    date: "October 14, 2025",
    exercises: [
      { 
        name: "Calf Raises", 
        sets: 4, 
        reps: 20, 
        weight: "45 lbs", 
        rest: "30 Secs", 
        notes: "Each Set is per leg Make sure to squeeze at the top of each rep.",
        completed: false 
      },
      { 
        name: "Calf Raises", 
        sets: 4, 
        reps: 20, 
        weight: "45 lbs", 
        rest: "30 Secs", 
        notes: "Each Set is per leg Make sure to squeeze at the top of each rep.",
        completed: false 
      },
      { 
        name: "Calf Raises", 
        sets: 4, 
        reps: 20, 
        weight: "45 lbs", 
        rest: "30 Secs", 
        notes: "Each Set is per leg Make sure to squeeze at the top of each rep.",
        completed: false 
      },
      { 
        name: "Calf Raises", 
        sets: 4, 
        reps: 20, 
        weight: "45 lbs", 
        rest: "30 Secs", 
        notes: "Each Set is per leg Make sure to squeeze at the top of each rep.",
        completed: false 
      }
    ]
  });

  const handleWorkoutComplete = (index) => {
    console.log(`Exercise ${index} completed`);
    // Logic to mark workout as complete will go here
  };

  return (
    <div className="workout-content">
      {/* Workout Header */}
      <div className="workout-header-section">
        <div className="workout-info">
          <h2>{workoutPlan.title}</h2>
          <p className="workout-date">{workoutPlan.date}</p>
        </div>
        <div className="workout-actions">
          <button className="feedback-btn-workout">Feedback</button>
          <button className="start-workout-btn">Start Workout</button>
        </div>
      </div>

      {/* Workout Table */}
      <div className="workout-table-section">
        <div className="table-container-workout">
          <table className="workout-table-full">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Rest</th>
                <th>Notes</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {workoutPlan.exercises.map((exercise, index) => (
                <tr key={index} className={exercise.completed ? 'completed' : ''}>
                  <td className="exercise-name">{exercise.name}</td>
                  <td className="exercise-sets">{exercise.sets}</td>
                  <td className="exercise-reps">{exercise.reps}</td>
                  <td className="exercise-weight">{exercise.weight}</td>
                  <td className="exercise-rest">{exercise.rest}</td>
                  <td className="exercise-notes">{exercise.notes}</td>
                  <td className="exercise-complete">
                    <input 
                      type="checkbox" 
                      checked={exercise.completed}
                      onChange={() => handleWorkoutComplete(index)}
                      className="exercise-checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workout Stats */}
      <div className="workout-stats-section">
        <div className="stats-grid-workout">
          <div className="stat-item-workout">
            <div className="stat-icon-workout">⏱️</div>
            <div className="stat-details">
              <span className="stat-value-workout">45 min</span>
              <span className="stat-label-workout">Duration</span>
            </div>
          </div>
          <div className="stat-item-workout">
            <div className="stat-icon-workout">🔥</div>
            <div className="stat-details">
              <span className="stat-value-workout">320</span>
              <span className="stat-label-workout">Calories Burned</span>
            </div>
          </div>
          <div className="stat-item-workout">
            <div className="stat-icon-workout">💪</div>
            <div className="stat-details">
              <span className="stat-value-workout">16</span>
              <span className="stat-label-workout">Total Sets</span>
            </div>
          </div>
          <div className="stat-item-workout">
            <div className="stat-icon-workout">🎯</div>
            <div className="stat-details">
              <span className="stat-value-workout">0/4</span>
              <span className="stat-label-workout">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workout History Preview */}
      <div className="workout-history-section">
        <div className="history-header">
          <h3>Recent Workouts</h3>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="history-list">
          <div className="history-item">
            <div className="history-date">Oct 12, 2025</div>
            <div className="history-workout">Upper Body</div>
            <div className="history-duration">38 min</div>
            <div className="history-status completed">✓</div>
          </div>
          <div className="history-item">
            <div className="history-date">Oct 10, 2025</div>
            <div className="history-workout">Cardio</div>
            <div className="history-duration">25 min</div>
            <div className="history-status completed">✓</div>
          </div>
          <div className="history-item">
            <div className="history-date">Oct 08, 2025</div>
            <div className="history-workout">Full Body</div>
            <div className="history-duration">50 min</div>
            <div className="history-status completed">✓</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutContent;