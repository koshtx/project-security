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
import java.util.Collection;
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
        return addAddress(addressDto.getUserId(), addressDto);
    }

    @Override
    @Transactional
    public AddressDto addAddress(Long id, AddressDto addressDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Boolean isPrimaryAddress = addressDto.getIsPrimary();
        Address address = new Address();
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());
        address.setIsPrimary(isPrimaryAddress);
        address.setUser(user);
        if(isPrimaryAddress) {
            unsetPrimaryAddress(id);
        }
        Address savedAddress = addressRepository.save(address);
        return convertToDto(savedAddress);
    }

    @Override
    public Optional<AddressDto> getAddressById(Long id) {
        return addressRepository.findById(id).map(this::convertToDto);
    }

    @Override
    public List<AddressDto> getAddress() {
        return addressRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<AddressDto> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AddressDto updateAddress(Long id, AddressDto addressDto) {
        Boolean isPrimaryAddress = addressDto.getIsPrimary();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());
        address.setIsPrimary(isPrimaryAddress);
        if(isPrimaryAddress) {
            unsetPrimaryAddress(address.getUser().getId());
        }
        Address updatedAddress = addressRepository.save(address);
        return convertToDto(updatedAddress);
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    @Override
    @Transactional
    public AddressDto setPrimaryAddress(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Unset previous default address
        unsetPrimaryAddress(user.getId());

        // Set new default address
        Address newDefault = addressRepository.findById(addressId)
            .orElseThrow(() -> new RuntimeException("Address not found"));
        newDefault.setIsPrimary(true);
        return convertToDto(addressRepository.save(newDefault));
    }

    @Transactional
    private void unsetPrimaryAddress(Long id) {
        Collection<Address> dir = addressRepository.findByUserIdAndIsPrimaryTrue(id);
        dir
        .stream()
        .forEach(
            prevDefault -> {
                prevDefault.setIsPrimary(false);
                addressRepository.save(prevDefault);
            });
    }

    private AddressDto convertToDto(Address address) {
        return new AddressDto(
            address.getId(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode(),
            address.getCountry(),
            address.getIsPrimary(),
            address.getUser().getId()
        );
    }
}