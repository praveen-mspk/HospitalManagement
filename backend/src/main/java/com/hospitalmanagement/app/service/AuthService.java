package com.hospitalmanagement.app.service;

import com.hospitalmanagement.app.dto.LoginRequestDTO;
import com.hospitalmanagement.app.dto.RegisterRequestDTO;

public interface AuthService {
    String register(RegisterRequestDTO request);
    String login(LoginRequestDTO request);
}
