package com.example.project.service;

import com.example.project.dto.RegisterRequest;
import com.example.project.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    
    /**
     * Registra un nuevo usuario en el sistema.
     * @param registerRequest El usuario a registrar
     * @return El usuario registrado
     */
    User registerUser(RegisterRequest registerRequest);

    /**
     * Busca un usuario por su nombre de usuario.
     * @param username El nombre de usuario a buscar
     * @return Un Optional que contiene al usuario si se encuentra, o vacío si no
     */
    Optional<User> getUserByUsername(String username);

    /**
     * Obtiene todos los usuarios del sistema.
     * @return Una lista de todos los usuarios
     */
    List<User> getAllUsers();

    /**
     * Actualiza la información de un usuario existente.
     * @param user El usuario con la información actualizada
     * @return El usuario actualizado
     */
    User updateUser(User user);

    /**
     * Elimina un usuario del sistema.
     * @param userId El ID del usuario a eliminar
     */
    void deleteUser(Long userId);

    /**
     * Verifica si existe un usuario con el nombre de usuario dado.
     * @param username El nombre de usuario a verificar
     * @return true si existe, false si no
     */
    boolean existsByUsername(String username);

    /**
     * Verifica si existe un usuario con el email dado.
     * @param email El email a verificar
     * @return true si existe, false si no
     */
    boolean existsByEmail(String email);

    /**
     * Añade un rol a un usuario existente.
     * @param username El nombre de usuario del usuario al que se añadirá el rol
     * @param roleName El nombre del rol a añadir
     */
    void addRoleToUser(String username, String roleName);
}