package com.attendease.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "class_students")
public class ClassStudent {

    @EmbeddedId
    private ClassStudentId id;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    private Student student;

	public ClassStudentId getId() {
		return id;
	}

	public void setId(ClassStudentId id) {
		this.id = id;
	}

	public ClassEntity getClassEntity() {
		return classEntity;
	}

	public void setClassEntity(ClassEntity classEntity) {
		this.classEntity = classEntity;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

    // getters and setters
    
}
