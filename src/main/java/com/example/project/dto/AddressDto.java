package com.example.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private Long id;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private Boolean isPrimary;
    private Long userId;

    public AddressDto(Long id, String street, String city, String state, String zipCode, String country, Boolean isPrimary) {
        this.id = id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.isPrimary = isPrimary;
    }
}