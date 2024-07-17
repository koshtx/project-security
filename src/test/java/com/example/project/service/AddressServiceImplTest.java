package com.example.project.service;

import com.example.project.dto.AddressDto;
import com.example.project.entity.Address;
import com.example.project.repository.AddressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AddressServiceImplTest {

    @Mock
    private AddressRepository addressRepository;

    @InjectMocks
    private AddressServiceImpl addressService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddAddress() {
        AddressDto addressDto = new AddressDto(null, "123 Test St", "Test City", "Test State", "12345");
        Address address = new Address(null, "123 Test St", "Test City", "Test State", "12345", null);
        Address savedAddress = new Address(1L, "123 Test St", "Test City", "Test State", "12345", null);

        when(addressRepository.save(any(Address.class))).thenReturn(savedAddress);

        AddressDto result = addressService.addAddress(addressDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("123 Test St", result.getStreet());
        verify(addressRepository).save(any(Address.class));
    }

    @Test
    void testGetAddressById() {
        Address address = new Address(1L, "123 Test St", "Test City", "Test State", "12345", null);
        when(addressRepository.findById(1L)).thenReturn(Optional.of(address));

        Optional<AddressDto> result = addressService.getAddressById(1L);

        assertTrue(result.isPresent());
        assertEquals("123 Test St", result.get().getStreet());
        verify(addressRepository).findById(1L);
    }
}