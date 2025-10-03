import React from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onNavigateToLogin, onNavigateToRegister }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-hero">
          <h1 className="welcome-title">Try out Trainer Free</h1>
          <p className="welcome-subtitle">Personal Trainer App</p>
        </div>

        <div className="metrics-row">
          <div className="metric-card calories">
            <div className="metric-title">Calories</div>
            <div className="metric-value">Base Goal</div>
            <div className="metric-sub">Food 1600 • Exercise 0 • Remaining 1600</div>
          </div>

          <div className="metric-card macros">
            <div className="metric-title">Macros</div>
            <div className="metric-chips">
              <div className="chip">Carbs 30%</div>
              <div className="chip">Fats 30%</div>
              <div className="chip">Protein 40%</div>
            </div>
          </div>

          <div className="metric-card progress">
            <div className="metric-title">Progress</div>
            <div className="metric-value">20%</div>
            <div className="metric-sub">Week over week</div>
          </div>
        </div>

        <div className="plan-panel">
          <div className="plan-header">
            <div className="plan-title">Todays Workout Plan: Leg Day</div>
            <button className="plan-cta">Punchlist</button>
          </div>

          <div className="plan-table">
            <div className="plan-row header">
              <div>Exercise</div>
              <div>Sets</div>
              <div>Reps</div>
              <div>Notes</div>
            </div>
            {Array.from({length:5}).map((_,i) => (
              <div className="plan-row" key={i}>
                <div>Calf Raises</div>
                <div>4</div>
                <div>12</div>
                <div>Each Set: 60s rest</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="welcome-actions" style={{ marginTop: 22 }}>
          <button onClick={onNavigateToLogin} className="submit-button">Sign In</button>
          <button onClick={onNavigateToRegister} className="create-account" style={{ marginLeft: 12 }}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;