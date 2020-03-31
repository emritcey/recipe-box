package com.spr.recipe_box.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {
    private String SECRET_KEY = "secret";

    /*Returns username from given token*/
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    /*Returns expiration date from given token*/
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    /*Takes in token, uses claims resolver to figure out what the claims are*/
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /*Creates JWT based off of userDetails param,
    * Passes a map of claims and createds token based
    * off of the username you need */
    public String generateToken(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    /* Call JWT API, set claims, set the username subject
    sets Issued at, and expiration (10 hrs from issued time)
    and signs the token with the secret key
    * */
    private String createToken(Map<String,Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 1000 * 60 * 10)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    /*Gets username, checks if username is the same as
    the username in userdetails that is passed in and
    checks that token has not expired */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
