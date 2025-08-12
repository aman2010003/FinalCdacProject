package com.mygaadi.controller;

import com.mygaadi.dto.InquiryRequestDTO;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inquiries")
public class InquiryController {
    @Autowired private InquiryService inquiryService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse> send(@RequestBody InquiryRequestDTO dto) {
        ;
        return ResponseEntity.ok(inquiryService.sendInquiry(dto));
    }
}