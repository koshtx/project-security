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
    void testFindByUser() {
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        entityManager.persist(user);

        Address address1 = new Address();
        address1.setStreet("123 Test St");
        address1.setCity("Test City");
        address1.setState("Test State");
        address1.setZipCode("12345");
        address1.setUser(user);

        Address address2 = new Address();
        address2.setStreet("456 Test Ave");
        address2.setCity("Test Town");
        address2.setState("Test State");
        address2.setZipCode("67890");
        address2.setUser(user);
        entityManager.persist(address1);
        entityManager.persist(address2);
        entityManager.flush();

        List<Address> found = addressRepository.findByUser(user);

        assertEquals(2, found.size());
        assertTrue(found.stream().anyMatch(a -> a.getStreet().equals("123 Test St")));
        assertTrue(found.stream().anyMatch(a -> a.getStreet().equals("456 Test Ave")));
    }

    // Add more tests for other custom methods in AddressRepository if any
}