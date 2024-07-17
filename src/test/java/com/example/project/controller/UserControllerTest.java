package com.example.project.controller;

import com.example.project.dto.UserDto;
import com.example.project.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        List<UserDto> users = Arrays.asList(
            new UserDto(1L, "user1", "user1@example.com"),
            new UserDto(2L, "user2", "user2@example.com")
        );
        when(userService.getAllUsers()).thenReturn(users);

        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<UserDto> responseBody = response.getBody();
        assertNotNull(responseBody, "Response body should not be null");
        assertEquals(2, responseBody.size(), "Response should contain 2 users");
        verify(userService).getAllUsers();
    }

    @Test
    void testGetUserByUsername_Found() {
        UserDto user = new UserDto(1L, "testuser", "test@example.com");
        when(userService.getUserByUsername("testuser")).thenReturn(Optional.of(user));

        ResponseEntity<UserDto> response = userController.getUserByUsername("testuser");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        UserDto responseBody = response.getBody();
        assertNotNull(responseBody, "Response body should not be null");
        assertEquals("testuser", responseBody.getUsername(), "Username should match");
        verify(userService).getUserByUsername("testuser");
    }

    @Test
    void testGetUserByUsername_NotFound() {
        when(userService.getUserByUsername("nonexistent")).thenReturn(Optional.empty());

        ResponseEntity<UserDto> response = userController.getUserByUsername("nonexistent");

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody(), "Response body should be null for not found user");
        verify(userService).getUserByUsername("nonexistent");
    }
}