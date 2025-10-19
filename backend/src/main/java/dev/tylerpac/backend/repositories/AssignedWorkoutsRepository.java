package dev.tylerpac.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.tylerpac.backend.entities.AssignedWorkouts;

public interface AssignedWorkoutsRepository extends JpaRepository<AssignedWorkouts, Long> {
}