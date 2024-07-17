package com.example.project.service;

import com.example.project.dto.AddressDto;
import com.example.project.entity.Address;
import com.example.project.entity.User;
import com.example.project.repository.AddressRepository;
import com.example.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public AddressDto addAddress(AddressDto addressDto) {
        User user = userRepository.findById(addressDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = new Address();
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setUser(user);

        Address savedAddress = addressRepository.save(address);
        return convertToDto(savedAddress);
    }

    @Override
    public Optional<AddressDto> getAddressById(Long id) {
        return addressRepository.findById(id).map(this::convertToDto);
    }

    @Override
    public List<AddressDto> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AddressDto updateAddress(Long id, AddressDto addressDto) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());

        Address updatedAddress = addressRepository.save(address);
        return convertToDto(updatedAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    private AddressDto convertToDto(Address address) {
        return new AddressDto(
            address.getId(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode(),
            address.getUser().getId()
        );
    }
}