package com.example.project.service;

import com.example.project.dto.RoleDto;
import com.example.project.entity.Role;
import com.example.project.entity.User;
import com.example.project.repository.RoleRepository;
import com.example.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public RoleDto addRole(RoleDto roleDto) {
        Role role = new Role();
        role.setName(roleDto.getName());
        Role savedRole = roleRepository.save(role);
        return convertToDto(savedRole);
    }

    @Override
    public Optional<RoleDto> getRoleById(Long id) {
        return roleRepository.findById(id).map(this::convertToDto);
    }

    @Override
    public List<RoleDto> getRole() {
        return roleRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RoleDto updateRole(Long id, RoleDto roleDto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        role.setName(roleDto.getName());
        Role updatedRole = roleRepository.save(role);
        return convertToDto(updatedRole);
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    private RoleDto convertToDto(Role role) {
        return new RoleDto(
            role.getId(),
            role.getName()
        );
    }
}