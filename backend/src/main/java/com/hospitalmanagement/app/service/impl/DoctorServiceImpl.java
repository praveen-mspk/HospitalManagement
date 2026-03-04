package com.hospitalmanagement.app.service.impl;

import com.hospitalmanagement.app.dto.AvailableSlotRequestDTO;
import com.hospitalmanagement.app.entity.*;
import com.hospitalmanagement.app.entity.AppointmentStatus;
import com.hospitalmanagement.app.repository.*;
import com.hospitalmanagement.app.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final UserRepository userRepository;
    private final AvailableSlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public Object addAvailableSlot(Long doctorId, AvailableSlotRequestDTO dto) {

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        AvailableSlot slot = new AvailableSlot();
        slot.setDoctor(doctor);
        slot.setDate(dto.getDate());
        slot.setStartTime(dto.getStartTime());
        slot.setEndTime(dto.getEndTime());

        return slotRepository.save(slot);
    }

    @Override
    public Object getDoctorAppointments(Long doctorId) {

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return appointmentRepository.findByDoctor(doctor);
    }

    @Override
    public String confirmAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);

        return "Appointment Confirmed";
    }
}