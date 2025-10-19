package dev.tylerpac.backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToMany(mappedBy = "trainer")
    private List<TrainerClients> trainerClients;

    @OneToMany(mappedBy = "assignedTo")
    private List<AssignedWorkouts> assignedWorkouts;

    // Enum for Role
    public enum Role {
        CLIENT,
        TRAINER
    }

    // Setters
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
    public void setRole(Role role) {
        this.role = role;
    }
    public void setTrainerClients(List<TrainerClients> trainerClients) {
        this.trainerClients = trainerClients;
    }
    public void setAssignedWorkouts(List<AssignedWorkouts> assignedWorkouts) {
        this.assignedWorkouts = assignedWorkouts;
    }

    // Getters
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
    public Role getRole() {
        return role;
    }
    public List<TrainerClients> getTrainerClients() {
        return trainerClients;
    }
    public List<AssignedWorkouts> getAssignedWorkouts() {
        return assignedWorkouts;
    }
}