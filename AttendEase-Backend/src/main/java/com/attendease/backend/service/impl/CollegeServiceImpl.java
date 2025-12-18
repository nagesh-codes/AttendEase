package com.attendease.backend.service.impl;

import org.springframework.stereotype.Service;
import com.attendease.backend.entity.CollegeStatus;
import com.attendease.backend.repository.CollegeRepository;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.dto.*;

import java.util.List;

@Service
public class CollegeServiceImpl implements CollegeService {

    private final CollegeRepository collegeRepository;

    public CollegeServiceImpl(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @Override
    public List<CollegeResponseDTO> getActiveColleges() {
        return collegeRepository.findByStatus(CollegeStatus.ACTIVE)
                .stream()
                .map(c -> new CollegeResponseDTO(c.getName(),c.getId()))
                .toList();
    }
}
