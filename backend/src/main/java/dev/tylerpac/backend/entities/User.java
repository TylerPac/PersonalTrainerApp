package dev.tylerpac.backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String password;

    @OneToMany(mappedBy = "user")
    private List<Nutrition> nutritionRecords;

    
    @OneToMany(mappedBy = "user")
    private List<Fitness> fitnessRecords;


    //sets
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setNutritionRecords(List<Nutrition> nutritionRecords) {
        this.nutritionRecords = nutritionRecords;
    }
    public void setFitnessRecords(List<Fitness> fitnessRecords) {
        this.fitnessRecords = fitnessRecords;
    }
    //gets
    public String getUsername() {
        return username;
    }  
    public String getPassword() {
        return password;
    }  
    public String getEmail() {
        return email;
    }
    public Long getId() {
        return id;
    }
    public List<Nutrition> getNutritionRecords() {
        return nutritionRecords;
    }
    public List<Fitness> getFitnessRecords() {
        return fitnessRecords;
    }
    
}