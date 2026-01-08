package com.attendease.backend.dto;

public class AddSubjectRequestDTO{
	private long classId;
	private String subjectName;
	public long getClassId() {
		return classId;
	}
	public void setClassId(long classId) {
		this.classId = classId;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
}