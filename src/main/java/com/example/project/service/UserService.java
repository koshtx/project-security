package com.example.project.service;

import com.example.project.dto.UserDto;
import com.example.project.dto.UserProfileDto;
import com.example.project.dto.RegisterRequest;
import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto registerUser(RegisterRequest registerRequest);
    Optional<UserDto> getUserByUsername(String username);
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    List<UserDto> getAllUsers();
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    UserProfileDto getCurrentUserProfile();
    UserProfileDto updateCurrentUserProfile(UserProfileDto userProfileDto);
}