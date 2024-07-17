package com.example.project.service;

import com.example.project.entity.User;
import com.example.project.entity.Role;
import org.springframework.security.core.userdetails.UserDetailsService;
import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    User registerUser(User user);
    Optional<User> getUserByUsername(String username);
    List<User> getAllUsers();
    User updateUser(User user);
    void deleteUser(Long userId);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    void addRoleToUser(String username, String roleName);
    List<Role> getUserRoles(String username);
    User saveUser(User user);
}