package com.example.project.repository;

import com.example.project.entity.Address;
import com.example.project.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class AddressRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AddressRepository addressRepository;

    @Test
    void testFindByUserId() {
        // Create a user
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        entityManager.persist(user);

        // Create addresses for the user
        Address address1 = new Address();
        address1.setStreet("123 Test St");
        address1.setCity("Test City");
        address1.setState("Test State");
        address1.setZipCode("12345");
        address1.setUser(user);
        entityManager.persist(address1);

        Address address2 = new Address();
        address2.setStreet("456 Another St");
        address2.setCity("Another City");
        address2.setState("Another State");
        address2.setZipCode("67890");
        address2.setUser(user);
        entityManager.persist(address2);

        entityManager.flush();

        // Test the findByUserId method
        List<Address> foundAddresses = addressRepository.findByUserId(user.getId());

        assertNotNull(foundAddresses);
        assertEquals(2, foundAddresses.size());
        assertTrue(foundAddresses.stream().anyMatch(a -> a.getStreet().equals("123 Test St")));
        assertTrue(foundAddresses.stream().anyMatch(a -> a.getStreet().equals("456 Another St")));
    }

    @Test
    void testFindByUserId_NoAddresses() {
        // Create a user without addresses
        User user = new User();
        user.setUsername("noaddruser");
        user.setEmail("noaddr@example.com");
        user.setPassword("password");
        entityManager.persist(user);
        entityManager.flush();

        // Test the findByUserId method
        List<Address> foundAddresses = addressRepository.findByUserId(user.getId());

        assertNotNull(foundAddresses);
        assertTrue(foundAddresses.isEmpty());
    }
}