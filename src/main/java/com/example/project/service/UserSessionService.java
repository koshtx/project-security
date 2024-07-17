package com.example.project.service;

import com.example.project.entity.User;
import com.example.project.entity.UserSession;
import com.example.project.repository.UserRepository;
import com.example.project.repository.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class UserSessionService {

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void saveSession(String username, String token) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSession session = new UserSession();
        session.setUsername(username);
        session.setToken(token);
        session.setExpiryDate(Instant.now().plusMillis(3600000)); // 1 hour expiration
        session.setUser(user);
        userSessionRepository.save(session);
    }

    @Transactional
    public void invalidateSession(String token) {
        userSessionRepository.deleteByToken(token);
    }

    public boolean isSessionValid(String token) {
        return userSessionRepository.findByToken(token)
                .map(session -> session.getExpiryDate().isAfter(Instant.now()))
                .orElse(false);
    }
}