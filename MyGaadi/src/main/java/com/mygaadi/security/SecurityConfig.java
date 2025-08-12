package com.mygaadi.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@Component
public class SecurityConfig {

	JwtRequestFilter jwtRequestFilter;
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults()) // 👈 enable CORS
            .authorizeHttpRequests(auth -> auth
            	    // ✅ Publicly accessible routes (login, registration, static assets etc.)
            	    .requestMatchers("/users/signin", "/users/signup", "/public/**").permitAll()

            	    .requestMatchers("/cars/all", "/cars/filter", "/cars/{id}", "/api/profile").permitAll()
            	    
            	    .requestMatchers("/cars/add", "/cars/my", "/cars/update/**", "/cars/**").authenticated()
            	    // ✅ Admin-only routes (accessible only to ROLE_ADMIN)
            	    .requestMatchers("/admin/**", "/users/admin/**", "/users/**").hasRole("ADMIN")

            	    // ✅ Any authenticated user can access these
            	
            	    .anyRequest().authenticated()


            	    // ✅ Everything else is denied unless explicitly allowed
            	 
            	

               
            ) .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
            http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
}
