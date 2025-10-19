package dev.tylerpac.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Fitness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float calories;
    private String exerciseType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;



    public Long getId() {
        return id;
    }
    public float getCalories() {
        return calories;
    }
    public User getUser() {
        return user;
    }
    public String getExerciseType() {
        return exerciseType;
    }


    public void setId(Long id) {
        this.id = id;
    }
    public void setCalories(float calories) {
        this.calories = calories;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    

    
}