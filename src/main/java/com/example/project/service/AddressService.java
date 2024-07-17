package com.example.project.service;

import com.example.project.entity.Address;
import com.example.project.entity.User;
import java.util.List;
import java.util.Optional;

public interface AddressService {
    Address addAddress(Address address);
    Optional<Address> getAddressById(Long id);
    List<Address> getAddressesByUser(User user);
    Address updateAddress(Address address);
    void deleteAddress(Long addressId);
}