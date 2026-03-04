package com.hospitalmanagement.app.controller;

import com.hospitalmanagement.app.dto.AppointmentRequestDTO;
import com.hospitalmanagement.app.dto.AppointmentResponseDTO;
import com.hospitalmanagement.app.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    //POST /api/appointments
    @PostMapping
    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    public ResponseEntity<AppointmentResponseDTO> createAppointment(
            @RequestBody             AppointmentRequestDTO request,
            @AuthenticationPrincipal UserDetails           principal
    ) {
        AppointmentResponseDTO response = appointmentService.createAppointment(
                request,
                principal.getUsername()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //GET /api/appointments
    @GetMapping
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointments(
            @AuthenticationPrincipal UserDetails principal
    ) {
        // Spring Security prefixes roles with ROLE_ internally
        String role = principal.getAuthorities().iterator().next().getAuthority();
        List<AppointmentResponseDTO> response = appointmentService.getAppointments(
                principal.getUsername(),
                role
        );
        return ResponseEntity.ok(response);
    }

    //GET /api/appointments/{id}
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR', 'ADMIN')")
    public ResponseEntity<AppointmentResponseDTO> getAppointmentById(
            @PathVariable            Long        id,
            @AuthenticationPrincipal UserDetails principal
    ) {
        String role = principal.getAuthorities().iterator().next().getAuthority();
        AppointmentResponseDTO response = appointmentService.getAppointmentById(
                id,
                principal.getUsername(),
                role
        );
        return ResponseEntity.ok(response);
    }
}