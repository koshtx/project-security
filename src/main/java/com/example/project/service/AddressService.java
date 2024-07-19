package com.example.project.service;

import com.example.project.dto.AddressDto;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    AddressDto addAddress(AddressDto addressDto);
    AddressDto addAddress(Long id, AddressDto addressDto);
    List<AddressDto> getAddress();
    Optional<AddressDto> getAddressById(Long id);
    List<AddressDto> getAddressesByUserId(Long userId);
    AddressDto updateAddress(Long id, AddressDto addressDto);
    void deleteAddress(Long id);
    AddressDto setPrimaryAddress(Long userId, Long addressId);
}