package com.example.project.controller;

import com.example.project.dto.AddressDto;
import com.example.project.service.AddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AddressControllerTest {

    @Mock
    private AddressService addressService;

    @InjectMocks
    private AddressController addressController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddAddress() {
        AddressDto addressDto = new AddressDto(null, "123 Test St", "Test City", "Test State", "12345");
        AddressDto savedAddress = new AddressDto(1L, "123 Test St", "Test City", "Test State", "12345");
        when(addressService.addAddress(any(AddressDto.class))).thenReturn(savedAddress);

        ResponseEntity<AddressDto> response = addressController.addAddress(addressDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(savedAddress, response.getBody());
        verify(addressService).addAddress(addressDto);
    }

    @Test
    void testGetAddressById() {
        AddressDto address = new AddressDto(1L, "123 Test St", "Test City", "Test State", "12345");
        when(addressService.getAddressById(1L)).thenReturn(Optional.of(address));

        ResponseEntity<?> response = addressController.getAddressById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(address, response.getBody());
        verify(addressService).getAddressById(1L);
    }
}