package com.hospitalmanagement.app.repository;

import com.hospitalmanagement.app.entity.Appointment;
import com.hospitalmanagement.app.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // All appointments for a patient
    List<Appointment> findByPatientIdOrderByAppointmentDateDescStartTimeAsc(Long patientId);

    // All appointments for a doctor
    List<Appointment> findByDoctorIdOrderByAppointmentDateDescStartTimeAsc(Long doctorId);

    // Slot conflict check — same doctor, same date, overlapping time, not cancelled
    boolean existsByDoctorIdAndAppointmentDateAndStartTimeAndStatusNot(
        Long doctorId,
        LocalDate appointmentDate,
        LocalTime startTime,
        AppointmentStatus status
    );
}