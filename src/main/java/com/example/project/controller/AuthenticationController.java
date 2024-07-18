package com.example.project.controller;

import com.example.project.dto.LoginRequest;
import com.example.project.dto.RegisterRequest;
import com.example.project.dto.JwtResponse;
import com.example.project.dto.UserDto;
import com.example.project.security.JwtUtil;
import com.example.project.service.UserService;
import com.example.project.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService userSessionService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDto userDto = userService.getUserByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String jwt = jwtUtil.generateToken(userDto.getUsername());
        
        userSessionService.saveSession(userDto.getUsername(), jwt);

        return ResponseEntity.ok(new JwtResponse(jwt, userDto.getId(), userDto.getUsername(), userDto.getEmail(), userDto.getRoles()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            if (userSessionService.isSessionValid(jwt)) {
                String refreshedToken = jwtUtil.refreshToken(jwt);
                userSessionService.invalidateSession(jwt);
                String username = jwtUtil.extractUsername(refreshedToken);
                userSessionService.saveSession(username, refreshedToken);
                return ResponseEntity.ok(new JwtResponse(refreshedToken));
            }
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            userSessionService.invalidateSession(jwt);
            return ResponseEntity.ok("Logged out successfully");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        UserDto userDto = userService.registerUser(registerRequest);
        return ResponseEntity.ok("User "+ userDto.getUsername()+ " registered successfully!");
    }
}