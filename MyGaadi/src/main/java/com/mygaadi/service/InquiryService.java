package com.mygaadi.service;

import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.InquiryRequestDTO;

public interface InquiryService {
    ApiResponse sendInquiry(InquiryRequestDTO dto);
}
