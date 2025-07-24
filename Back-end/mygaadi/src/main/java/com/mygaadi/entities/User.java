package com.mygaadi.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"password", "confirmPassword"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(name = "phone_no", nullable = false, unique = true)
    private String phoneNo;
    
    @Column(nullable = false)
    private String password;
    
    @Transient
    private String confirmPassword;
    
    @Column(name = "created_at")
    private LocalDate createdAt;
}