package com.example.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    
    @NotBlank
    private String username;
    private String firstName;
    private String lastName;

    @NotBlank
    @Email
    private String email;
    private String password;
    private Set<String> roles;
    private String fullAddress;
    
    /**
     * Indica si la cuenta del usuario ha expirado.
     * @return true si la cuenta es válida (no ha expirado), false en caso contrario.
     */
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indica si el usuario está bloqueado o desbloqueado.
     * @return true si el usuario no está bloqueado, false en caso contrario.
     */
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indica si las credenciales del usuario (contraseña) han expirado.
     * @return true si las credenciales son válidas (no han expirado), false en caso contrario.
     */
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indica si el usuario está habilitado o deshabilitado.
     * @return true si el usuario está habilitado, false en caso contrario.
     */
    public boolean isEnabled() {
        return true;
    }

    public UserDto(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}