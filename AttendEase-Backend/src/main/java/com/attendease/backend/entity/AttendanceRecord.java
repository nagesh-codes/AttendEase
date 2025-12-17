package com.attendease.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance_records")
public class AttendanceRecord {

    @EmbeddedId
    private AttendanceRecordId id;

    @ManyToOne
    @MapsId("sessionId")
    @JoinColumn(name = "session_id")
    private AttendanceSession session;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

	public AttendanceRecordId getId() {
		return id;
	}

	public void setId(AttendanceRecordId id) {
		this.id = id;
	}

	public AttendanceSession getSession() {
		return session;
	}

	public void setSession(AttendanceSession session) {
		this.session = session;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public AttendanceStatus getStatus() {
		return status;
	}

	public void setStatus(AttendanceStatus status) {
		this.status = status;
	}

    // getters and setters
    
}
