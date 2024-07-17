package com.example.project.service;

import com.example.project.dto.RegisterRequest;
import com.example.project.dto.UserDto;
import com.example.project.entity.User;
import com.example.project.entity.Role;
import com.example.project.repository.UserRepository;
import com.example.project.repository.RoleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUser() {
        RegisterRequest registerRequest = new RegisterRequest("testuser", "test@example.com", "password");
        Role userRole = new Role(1L, "ROLE_USER");
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");
        user.setRoles(Set.of(userRole));

        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserDto result = userService.registerUser(registerRequest);

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("test@example.com", result.getEmail());
        assertTrue(result.getRoles().contains("ROLE_USER"));

        verify(userRepository).save(any(User.class));
    }

    @Test
    void testExistsByUsername() {
        when(userRepository.existsByUsername("existingUser")).thenReturn(true);
        when(userRepository.existsByUsername("newUser")).thenReturn(false);

        assertTrue(userService.existsByUsername("existingUser"));
        assertFalse(userService.existsByUsername("newUser"));
    }

    @Test
    void testExistsByEmail() {
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);

        assertTrue(userService.existsByEmail("existing@example.com"));
        assertFalse(userService.existsByEmail("new@example.com"));
    }
}