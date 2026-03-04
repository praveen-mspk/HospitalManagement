package com.hospitalmanagement.app.service;

import com.hospitalmanagement.app.dto.AvailableSlotRequestDTO;

public interface DoctorService {

    Object addAvailableSlot(Long doctorId, AvailableSlotRequestDTO dto);

    Object getDoctorAppointments(Long doctorId);

    String confirmAppointment(Long appointmentId);
}