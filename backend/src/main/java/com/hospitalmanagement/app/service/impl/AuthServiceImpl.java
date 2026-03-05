package com.hospitalmanagement.app.service.impl;

import com.hospitalmanagement.app.dto.LoginRequestDTO;
import com.hospitalmanagement.app.dto.RegisterRequestDTO;
import com.hospitalmanagement.app.entity.User;
import com.hospitalmanagement.app.repository.DepartmentRepository;
import com.hospitalmanagement.app.repository.UserRepository;
import com.hospitalmanagement.app.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String register(RegisterRequestDTO request) {

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setSpecialization(request.getSpecialization());

        if (request.getDepartmentId() != null) {
            user.setDepartment(
                    departmentRepository.findById(request.getDepartmentId())
                            .orElseThrow(() -> new RuntimeException("Department not found"))
            );
        }

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Override
    public String login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return "Login Successful";
    }
}