package com.example.project.service;

import com.example.project.dto.RoleDto;
import java.util.List;
import java.util.Optional;

public interface RoleService {
    RoleDto addRole(RoleDto roleDto);
    List<RoleDto> getRole();
    Optional<RoleDto> getRoleById(Long id);
    RoleDto updateRole(Long id, RoleDto roleDto);
    void deleteRole(Long id);
}