package dev.tylerpac.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.tylerpac.backend.entities.AssignedWorkoutDetails;

public interface AssignedWorkoutDetailsRepository extends JpaRepository<AssignedWorkoutDetails, Long> {
}