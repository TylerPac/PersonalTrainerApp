package dev.tylerpac.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.tylerpac.backend.entities.TrainerClients;
import dev.tylerpac.backend.entities.User;

public interface TrainerClientsRepository extends JpaRepository<TrainerClients, Long> {
    List<TrainerClients> findByTrainer(User trainer);
    Optional<TrainerClients> findByTrainerAndClient(User trainer, User client);
}