package com.example.project.repository;

import com.example.project.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUsername() {
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("password");
        entityManager.persist(user);
        entityManager.flush();

        User found = userRepository.findByUsername("testuser").orElse(null);

        assertNotNull(found);
        assertEquals("testuser", found.getUsername());
    }

    @Test
    void testExistsByUsername() {
        User user = new User();
        user.setUsername("existinguser");
        user.setEmail("existing@example.com");
        user.setPassword("password");
        entityManager.persist(user);
        entityManager.flush();

        assertTrue(userRepository.existsByUsername("existinguser"));
        assertFalse(userRepository.existsByUsername("nonexistinguser"));
    }

    @Test
    void testExistsByEmail() {
        User user = new User();
        user.setUsername("emailuser");
        user.setEmail("existing@example.com");
        user.setPassword("password");
        entityManager.persist(user);
        entityManager.flush();

        assertTrue(userRepository.existsByEmail("existing@example.com"));
        assertFalse(userRepository.existsByEmail("nonexisting@example.com"));
    }
}