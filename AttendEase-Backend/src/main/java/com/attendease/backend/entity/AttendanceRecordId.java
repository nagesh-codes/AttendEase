package com.attendease.backend.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AttendanceRecordId implements Serializable {

    private Long sessionId;
    private Long studentId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AttendanceRecordId)) return false;
        AttendanceRecordId that = (AttendanceRecordId) o;
        return Objects.equals(sessionId, that.sessionId)
            && Objects.equals(studentId, that.studentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sessionId, studentId);
    }
}
