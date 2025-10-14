import { useState } from 'react';
import './NutritionContent.css';

const NutritionContent = ({ currentUser }) => {
  const [nutritionData] = useState({
    calories: { 
      current: 1600, 
      goal: 2000, 
      food: 1600,
      exercise: 600, 
      remaining: 1000 
    },
    macros: {
      carbs: { current: 70, target: 30, color: "#ff6b6b", goal: "150g" },
      fats: { current: 70, target: 30, color: "#ffa500", goal: "150g" },
      protein: { current: 50, target: 40, color: "#00d4aa", goal: "150g" },
      water: { current: 60, target: 60, color: "#4da6ff", goal: "150g" }
    }
  });

  const [meals] = useState([
    {
      name: "Breakfast",
      calories: { min: 400, max: 500 },
      protein: { target: ">=", value: "25g" },
      carbs: { target: "-", value: "40g" },
      fats: { target: "<=", value: "12g" }
    },
    {
      name: "Lunch", 
      calories: { min: 400, max: 500 },
      protein: { target: ">=", value: "25g" },
      carbs: { target: "-", value: "40g" },
      fats: { target: "<=", value: "12g" }
    },
    {
      name: "Dinner",
      calories: { min: 400, max: 500 },
      protein: { target: ">=", value: "25g" },
      carbs: { target: "-", value: "40g" },
      fats: { target: "<=", value: "12g" }
    }
  ]);

  const [todaysFoods] = useState([
    { name: "Greek Yogurt", calories: 150, time: "8:30 AM" },
    { name: "Chicken Salad", calories: 320, time: "12:45 PM" },
    { name: "Apple", calories: 95, time: "3:20 PM" },
    { name: "Salmon Dinner", calories: 450, time: "7:00 PM" },
    { name: "Almonds", calories: 160, time: "9:15 PM" }
  ]);

  const handleMealIdeas = (mealType) => {
    console.log(`Show meal ideas for ${mealType}`);
  };

  return (
    <div className="nutrition-content">
      {/* Top Nutrition Overview */}
      <div className="nutrition-overview">
        {/* Calories Section */}
        <div className="calories-section-nutr">
          <div className="calories-card-nutr">
            <div className="calories-header">
              <h3>Calories</h3>
              <div className="goal-info">
                <span className="goal-label-nutr">Base Goal</span>
                <span className="goal-value-nutr">{nutritionData.calories.goal}</span>
              </div>
            </div>
            <div className="calories-circle-container">
              <svg className="calories-progress-circle" width="120" height="120">
                <circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="8" fill="none" />
                <circle cx="60" cy="60" r="50" stroke="#00d4aa" strokeWidth="8" fill="none" 
                        strokeDasharray={`${2 * Math.PI * 50}`} 
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - (nutritionData.calories.current / nutritionData.calories.goal))}`}
                        strokeLinecap="round" transform="rotate(-90 60 60)" />
              </svg>
              <div className="calories-center-text">
                <span className="calories-current">{nutritionData.calories.current}</span>
                <span className="calories-remaining">remaining</span>
              </div>
            </div>
            <div className="calories-breakdown">
              <div className="breakdown-item">
                <span>Food</span>
                <span>{nutritionData.calories.food}</span>
              </div>
              <div className="breakdown-item">
                <span>Exercise</span>
                <span>{nutritionData.calories.exercise}</span>
              </div>
              <div className="breakdown-item">
                <span>Remaining</span>
                <span>{nutritionData.calories.remaining}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Macros Section */}
        <div className="macros-section-nutr">
          <div className="macros-card-nutr">
            <h3>Macros</h3>
            <div className="macros-grid">
              {Object.entries(nutritionData.macros).map(([key, macro]) => (
                <div key={key} className="macro-item-nutr">
                  <svg className="macro-circle-nutr" width="80" height="80">
                    <circle cx="40" cy="40" r="30" stroke="#333" strokeWidth="6" fill="none" />
                    <circle cx="40" cy="40" r="30" stroke={macro.color} strokeWidth="6" fill="none" 
                            strokeDasharray={`${2 * Math.PI * 30}`} 
                            strokeDashoffset={`${2 * Math.PI * 30 * (1 - (macro.current / 100))}`}
                            strokeLinecap="round" transform="rotate(-90 40 40)" />
                  </svg>
                  <div className="macro-center-text">{macro.goal}</div>
                  <span className="macro-label-nutr">{key.charAt(0).toUpperCase() + key.slice(1)} {macro.target}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meals Section */}
      <div className="meals-section-nutr">
        <div className="meals-header">
          <h3>Today's Meal Plan</h3>
          <button className="add-food-btn">+ Add Food</button>
        </div>
        <div className="meals-grid">
          {meals.map((meal, index) => (
            <div key={index} className="meal-card-nutr">
              <h4>{meal.name}</h4>
              <div className="meal-targets">
                <div className="target-row">
                  <span className="target-label">Calories</span>
                  <span className="target-range">{meal.calories.min} - {meal.calories.max}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Protein</span>
                  <span className="target-symbol">{meal.protein.target}</span>
                  <span className="target-value">{meal.protein.value}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Carbs</span>
                  <span className="target-symbol">{meal.carbs.target}</span>
                  <span className="target-value">{meal.carbs.value}</span>
                </div>
                <div className="target-row">
                  <span className="target-label">Fats</span>
                  <span className="target-symbol">{meal.fats.target}</span>
                  <span className="target-value">{meal.fats.value}</span>
                </div>
              </div>
              <button 
                className="meal-ideas-btn" 
                onClick={() => handleMealIdeas(meal.name.toLowerCase())}
              >
                Meal Ideas
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Food Log Section */}
      <div className="food-log-section">
        <div className="food-log-header">
          <h3>Today's Food Log</h3>
          <div className="log-actions">
            <button className="quick-add-btn">Quick Add</button>
            <button className="search-food-btn">🔍 Search Food</button>
          </div>
        </div>
        <div className="food-log-list">
          {todaysFoods.map((food, index) => (
            <div key={index} className="food-log-item">
              <div className="food-info">
                <span className="food-name">{food.name}</span>
                <span className="food-time">{food.time}</span>
              </div>
              <div className="food-calories">
                <span>{food.calories} cal</span>
                <button className="edit-food-btn">✏️</button>
              </div>
            </div>
          ))}
        </div>
        <div className="food-log-total">
          <strong>Total: {todaysFoods.reduce((sum, food) => sum + food.calories, 0)} calories</strong>
        </div>
      </div>
    </div>
  );
};

export default NutritionContent;