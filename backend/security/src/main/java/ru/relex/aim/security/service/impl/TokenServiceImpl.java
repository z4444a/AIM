package ru.relex.aim.security.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import ru.relex.aim.security.model.AuthResponse;
import ru.relex.aim.security.service.ITokenService;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 *  Implements {@link ITokenService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class TokenServiceImpl implements ITokenService {

  private static final String BEARER = "Bearer ";
  private static final String AUTHORIZATION = "Authorization";
  private static final int ACCESS_TIME = 5;
  private static final int REFRESH_TIME = 30;
  private static final Key SIGNING_KEY;

  static {
    final SecureRandom secureRandom = new SecureRandom();

    final byte[] bytes = new byte[512 / 8];
    secureRandom.nextBytes(bytes);

    SIGNING_KEY = Keys.hmacShaKeyFor(bytes);
  }



  @Override
  public AuthResponse generateToken(String login) {
    final var now = Instant.now();

    final String accessToken =
        Jwts.builder().signWith(SIGNING_KEY)
            .setSubject(login)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plus(ACCESS_TIME, ChronoUnit.MINUTES)))
            .compact();

    final String refreshToken = Jwts.builder().signWith(SIGNING_KEY)
        .setSubject(login)
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(now.plus(REFRESH_TIME, ChronoUnit.MINUTES)))
        .claim("refresh", "true")
        .compact();                                                                       

    return new AuthResponse(accessToken, refreshToken);
  }

  @Override
  public Jws<Claims> readToken(final HttpServletRequest request) {

    final String header = request.getHeader(AUTHORIZATION);

    if (header == null || !header.startsWith(BEARER)) {     
      return null;
    }

    final String token = header.substring(BEARER.length()); 

    try {
      return Jwts
          .parser()
          .setSigningKey(SIGNING_KEY)
          .parseClaimsJws(token);                           
    } catch (JwtException e) {
      return null;
    }
  }
}
