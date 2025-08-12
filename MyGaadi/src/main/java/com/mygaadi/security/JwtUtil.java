package com.mygaadi.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import com.mygaadi.entities.CustomUserDetails;
import com.mygaadi.entities.User;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	private final String secretKey = "mySuperSecretKey1234567890abcdXYZ1234"; // 36 chars
	private final long expiration = 1000 * 60 * 60 * 10; // 10 hours

	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
	}

	public String generateToken(User user) {

		return Jwts.builder().setSubject(user.getEmail()).claim("roles", user.getType().toString())
				.setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}

	public String extractEmail(String token) {
		return getClaims(token).getSubject();
	}

	public boolean validateToken(String token) {
		try {
			getClaims(token); // throws if invalid
			return true;
		} catch (JwtException e) {
			return false;
		}
	}

	private Claims getClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
	}

	public String extractRoles(String token) {
		return getClaims(token).get("roles", String.class);
	}
}
