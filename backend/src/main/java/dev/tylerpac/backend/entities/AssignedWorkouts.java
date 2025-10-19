package dev.tylerpac.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AssignedWorkouts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignedWorkoutID;

    private String assignedDate;

    @ManyToOne
    @JoinColumn(name = "assignedByID")
    private User assignedBy;

    @ManyToOne
    @JoinColumn(name = "assignedToID")
    private User assignedTo;

    private User trainer;
    private User client;

    // Getters and Setters
    public Long getAssignedWorkoutID() {
        return assignedWorkoutID;
    }

    public void setAssignedWorkoutID(Long assignedWorkoutID) {
        this.assignedWorkoutID = assignedWorkoutID;
    }

    public String getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(String assignedDate) {
        this.assignedDate = assignedDate;
    }

    public User getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(User assignedBy) {
        this.assignedBy = assignedBy;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public User getTrainer() {
        return trainer;
    }

    public void setTrainer(User trainer) {
        this.trainer = trainer;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }
}