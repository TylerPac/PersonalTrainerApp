package dev.tylerpac.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TrainerClients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerClientID;

    private String startDate;

    @ManyToOne
    @JoinColumn(name = "trainerID")
    private User trainer;

    @ManyToOne
    @JoinColumn(name = "clientID")
    private User client;

    // Getters and Setters
    public Long getTrainerClientID() {
        return trainerClientID;
    }

    public void setTrainerClientID(Long trainerClientID) {
        this.trainerClientID = trainerClientID;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
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