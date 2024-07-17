package com.example.project.service;

import com.example.project.dto.UserDto;
import com.example.project.dto.RegisterRequest;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto registerUser(RegisterRequest registerRequest);
    Optional<UserDto> getUserByUsername(String username);
    List<UserDto> getAllUsers();
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}