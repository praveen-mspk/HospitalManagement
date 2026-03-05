package com.hospitalmanagement.app.service.impl;

import com.hospitalmanagement.app.dto.AppointmentRequestDTO;
import com.hospitalmanagement.app.dto.AppointmentResponseDTO;
import com.hospitalmanagement.app.entity.*;
import com.hospitalmanagement.app.entity.AppointmentStatus;
import com.hospitalmanagement.app.repository.AppointmentRepository;
import com.hospitalmanagement.app.repository.UserRepository;
import com.hospitalmanagement.app.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository        userRepository;

    //Create

    @Override
    @Transactional
    public AppointmentResponseDTO createAppointment(AppointmentRequestDTO dto, String patientEmail) {

        User patient = userRepository.findByEmail(patientEmail)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        User doctor = userRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found: " + dto.getDoctorId()));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new RuntimeException("Selected user is not a doctor.");
        }

        // Slot conflict — same doctor, same date, same startTime, not cancelled
        boolean conflict = appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndStartTimeAndStatusNot(
                        doctor.getId(),
                        dto.getAppointmentDate(),
                        dto.getStartTime(),
                        AppointmentStatus.CANCELLED
                );

        if (conflict) {
            throw new RuntimeException("This slot is already booked. Please choose a different time.");
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStartTime(dto.getStartTime());
        appointment.setEndTime(dto.getEndTime());
        appointment.setStatus(AppointmentStatus.BOOKED);
        appointment.setFee(0.0);  // update fee logic later via doctor profile

        return toResponse(appointmentRepository.save(appointment));
    }

    //Read

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponseDTO> getAppointments(String email, String role) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Appointment> appointments = switch (role) {
            case "ROLE_PATIENT" -> appointmentRepository
                    .findByPatientIdOrderByAppointmentDateDescStartTimeAsc(user.getId());
            case "ROLE_DOCTOR"  -> appointmentRepository
                    .findByDoctorIdOrderByAppointmentDateDescStartTimeAsc(user.getId());
            case "ROLE_ADMIN"   -> appointmentRepository.findAll();
            default -> throw new RuntimeException("Unknown role: " + role);
        };

        return appointments.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseDTO getAppointmentById(Long id, String callerEmail, String role) {

        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found: " + id));

        boolean isAdmin   = role.equals("ROLE_ADMIN");
        boolean isPatient = appt.getPatient().getEmail().equals(callerEmail);
        boolean isDoctor  = appt.getDoctor().getEmail().equals(callerEmail);

        if (!isAdmin && !isPatient && !isDoctor) {
            throw new AccessDeniedException("You do not have permission to view this appointment.");
        }

        return toResponse(appt);
    }

    //Mapper

    private AppointmentResponseDTO toResponse(Appointment a) {
        return new AppointmentResponseDTO(
                a.getId(),
                a.getPatient().getId(),
                a.getPatient().getName(),
                a.getDoctor().getId(),
                a.getDoctor().getName(),
                a.getAppointmentDate(),
                a.getStartTime(),
                a.getEndTime(),
                a.getStatus(),
                a.getFee(),
                a.getCreatedAt()
        );
    }
}