package ru.relex.aim.security.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import ru.relex.aim.security.model.AuthResponse;

import javax.servlet.http.HttpServletRequest;

/**
 * Generates and reads jwt.
 *
 * @author Sorokin Georgy
 */
public interface ITokenService {

  /**
   * Generates both login and refresh tokens based on authentication data.
   * Parameter is required.
   * @param login used to retrieve user info from database.
   * @return authentication response which contains generated JWT tokens.
   */
  AuthResponse generateToken(String login);

  /**
   * Reads the authentication token from request.
   *
   * @param request contains token
   * @return claims of token which contains user's authentication data
   */
  Jws<Claims> readToken(HttpServletRequest request);
}
