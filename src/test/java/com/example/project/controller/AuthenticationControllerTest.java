package com.example.project.controller;

import com.example.project.dto.LoginRequest;
import com.example.project.dto.RegisterRequest;
import com.example.project.dto.JwtResponse;
import com.example.project.dto.UserDto;
import com.example.project.security.JwtUtil;
import com.example.project.service.UserService;
import com.example.project.service.UserSessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AuthenticationControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserService userService;

    @Mock
    private UserSessionService userSessionService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticateUser() {
        LoginRequest loginRequest = new LoginRequest("testuser", "password");
        Authentication authentication = mock(Authentication.class);
        UserDto userDto = new UserDto(1L, "testuser", "test@example.com");
        
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(userService.getUserByUsername("testuser")).thenReturn(Optional.of(userDto));
        when(jwtUtil.generateToken("testuser")).thenReturn("testToken");

        ResponseEntity<?> response = authenticationController.authenticateUser(loginRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof JwtResponse);
        JwtResponse jwtResponse = (JwtResponse) response.getBody();
        assertEquals("testToken", jwtResponse.getToken());
        assertEquals("testuser", jwtResponse.getUsername());
        
        verify(userSessionService).saveSession("testuser", "testToken");
    }

    @Test
    void testRegisterUser() {
        Set<String> roles = new HashSet<String>();
        roles.add("ROLE_ADMIN");
        RegisterRequest registerRequest = new RegisterRequest("newuser", "new@example.com", "password", roles);
        UserDto registeredUser = new UserDto(1L, "newuser", "new@example.com");
        
        when(userService.existsByUsername("newuser")).thenReturn(false);
        when(userService.existsByEmail("new@example.com")).thenReturn(false);
        when(userService.registerUser(registerRequest)).thenReturn(registeredUser);
        when(jwtUtil.generateToken("newuser")).thenReturn("newUserToken");

        ResponseEntity<?> response = authenticationController.registerUser(registerRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof JwtResponse);
        JwtResponse jwtResponse = (JwtResponse) response.getBody();
        assertEquals("newUserToken", jwtResponse.getToken());
        assertEquals("newuser", jwtResponse.getUsername());
    }

    @Test
    void testRegisterUserUsernameExists() {
        Set<String> roles = new HashSet<String>();
        roles.add("ROLE_ADMIN");
        RegisterRequest registerRequest = new RegisterRequest("existinguser", "new@example.com", "password",roles);
        
        when(userService.existsByUsername("existinguser")).thenReturn(true);

        ResponseEntity<?> response = authenticationController.registerUser(registerRequest);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Error: Username is already taken!", response.getBody());
    }

    @Test
    void testRegisterUserEmailExists() {
        Set<String> roles = new HashSet<String>();
        roles.add("ROLE_ADMIN");
        RegisterRequest registerRequest = new RegisterRequest("newuser", "existing@example.com", "password", roles);
        
        when(userService.existsByUsername("newuser")).thenReturn(false);
        when(userService.existsByEmail("existing@example.com")).thenReturn(true);

        ResponseEntity<?> response = authenticationController.registerUser(registerRequest);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Error: Email is already in use!", response.getBody());
    }
}