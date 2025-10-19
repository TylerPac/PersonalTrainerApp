package dev.tylerpac.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tylerpac.backend.entities.AssignedWorkoutDetails;
import dev.tylerpac.backend.entities.AssignedWorkouts;
import dev.tylerpac.backend.entities.TrainerClients;
import dev.tylerpac.backend.entities.User;
import dev.tylerpac.backend.jwt.JwtUtil;
import dev.tylerpac.backend.repositories.AssignedWorkoutDetailsRepository;
import dev.tylerpac.backend.repositories.AssignedWorkoutsRepository;
import dev.tylerpac.backend.repositories.TrainerClientsRepository;
import dev.tylerpac.backend.repositories.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from the frontend
public class UserController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TrainerClientsRepository trainerClientsRepository;
    private final AssignedWorkoutsRepository assignedWorkoutsRepository;
    private final AssignedWorkoutDetailsRepository assignedWorkoutDetailsRepository;

    // Constructor
    /*
       userRepository == essentially the link to the database for user data
       JwtUtil == Json web token utility class for handling JWT operations (security)
       authenticationManager == spring security class for managing authentication gatekeeper 
         passwordEncoder == utility for encrypting passwords before storing in database
    */
    public UserController(UserRepository userRepository, JwtUtil jwtUtil, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder,
                          TrainerClientsRepository trainerClientsRepository, AssignedWorkoutsRepository assignedWorkoutsRepository,
                          AssignedWorkoutDetailsRepository assignedWorkoutDetailsRepository) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.trainerClientsRepository = trainerClientsRepository;
        this.assignedWorkoutsRepository = assignedWorkoutsRepository;
        this.assignedWorkoutDetailsRepository = assignedWorkoutDetailsRepository;
    }

    @PostMapping("/login") // Endpoint for user login
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate the user with the provided username and password
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), 
                    loginRequest.getPassword()
                )
            );

            // Retrieve the user from the database
            User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Generate a JWT token for the authenticated user
            String token = jwtUtil.generateToken(user.getUsername());

            // Create a response containing the token and user details
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", createUserResponse(user));

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            // Return an error response if authentication fails
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/register") // Endpoint for user registration
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if the username already exists in the database
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Check if the email already exists in the database
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Encrypt the user's password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Generate a JWT token for the newly registered user
        String token = jwtUtil.generateToken(savedUser.getUsername());

        // Create a response containing the token and user details
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", createUserResponse(savedUser));

        return ResponseEntity.ok(response);
    }

    // Helper method to create a user response without sensitive data
    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId()); // Add user ID to the response
        userResponse.put("username", user.getUsername()); // Add username to the response
        userResponse.put("email", user.getEmail()); // Add email to the response
        return userResponse;
    }

    // Inner class to represent login request payload
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @RestController
    @RequestMapping("/trainers")
    public class TrainerController {

        private final UserRepository userRepository;
        private final TrainerClientsRepository trainerClientsRepository;
        private final AssignedWorkoutsRepository assignedWorkoutsRepository;
        private final AssignedWorkoutDetailsRepository assignedWorkoutDetailsRepository;

        public TrainerController(UserRepository userRepository, TrainerClientsRepository trainerClientsRepository,
                                  AssignedWorkoutsRepository assignedWorkoutsRepository,
                                  AssignedWorkoutDetailsRepository assignedWorkoutDetailsRepository) {
            this.userRepository = userRepository;
            this.trainerClientsRepository = trainerClientsRepository;
            this.assignedWorkoutsRepository = assignedWorkoutsRepository;
            this.assignedWorkoutDetailsRepository = assignedWorkoutDetailsRepository;
        }

        @GetMapping("/clients")
        public ResponseEntity<?> getTrainerClients() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String trainerUsername = authentication.getName();

            User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

            List<TrainerClients> clients = trainerClientsRepository.findByTrainer(trainer);
            return ResponseEntity.ok(clients);
        }

        @PostMapping("/workouts")
        public ResponseEntity<?> createWorkout(@RequestBody AssignedWorkouts assignedWorkout) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String trainerUsername = authentication.getName();

            User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

            // Ensure the trainer is assigning the workout to their client
            TrainerClients trainerClient = trainerClientsRepository.findByTrainerAndClient(trainer, assignedWorkout.getClient())
                .orElseThrow(() -> new RuntimeException("Client not found under this trainer"));

            assignedWorkout.setTrainer(trainer);
            AssignedWorkouts savedWorkout = assignedWorkoutsRepository.save(assignedWorkout);
            return ResponseEntity.ok(savedWorkout);
        }

        @PostMapping("/workouts/details")
        public ResponseEntity<?> addWorkoutDetails(@RequestBody AssignedWorkoutDetails workoutDetails) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String trainerUsername = authentication.getName();

            User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

            // Ensure the trainer is adding details to their client's workout
            AssignedWorkouts assignedWorkout = assignedWorkoutsRepository.findById(workoutDetails.getAssignedWorkout().getId())
                .orElseThrow(() -> new RuntimeException("Workout not found"));

            if (!assignedWorkout.getTrainer().equals(trainer)) {
                throw new RuntimeException("You are not authorized to modify this workout");
            }

            AssignedWorkoutDetails savedDetails = assignedWorkoutDetailsRepository.save(workoutDetails);
            return ResponseEntity.ok(savedDetails);
        }
    }
}