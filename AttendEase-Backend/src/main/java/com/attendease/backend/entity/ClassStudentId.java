package com.attendease.backend.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ClassStudentId implements Serializable {

    private Long classId;
    private Long studentId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClassStudentId)) return false;
        ClassStudentId that = (ClassStudentId) o;
        return Objects.equals(classId, that.classId)
            && Objects.equals(studentId, that.studentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, studentId);
    }
}
