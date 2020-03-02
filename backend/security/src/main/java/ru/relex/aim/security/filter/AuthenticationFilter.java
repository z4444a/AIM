package ru.relex.aim.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.relex.aim.security.config.Url;
import ru.relex.aim.security.model.AuthRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

/**
 * Authenticates the first user if he sent the correct password and login.
 *
 * @author Sorokin Georgy
 */
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final ObjectMapper objectMapper = new ObjectMapper();

  /**
   * Constructor.
   *  Forbids to create session, sets URL, which can be used to login user.
   *  All parameters are required.
   * @param successHandler forms and sends access- and refresh-token to user
   *                       if authentication is success.
   * @param authManager authenticates user by his login and password
   */
  public AuthenticationFilter(AuthenticationSuccessHandler successHandler, AuthenticationFailureHandler failureHandler,
                              AuthenticationManager authManager) {
    super();
    this.setAllowSessionCreation(false);
    this.setAuthenticationManager(authManager);
    this.setFilterProcessesUrl(Url.LOGIN);
    this.setAuthenticationSuccessHandler(successHandler);
    this.setAuthenticationFailureHandler(failureHandler);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
                                              HttpServletResponse response) throws AuthenticationException {
    try (var reader = request.getReader()) {
      final String result = reader.lines().collect(Collectors.joining()); 
      final AuthRequest authRequest = objectMapper.readValue(result, AuthRequest.class);
      final Authentication auth = getAuthentication(authRequest);
      return getAuthenticationManager().authenticate(auth); 
    } catch (IOException e) {
      throw new BadCredentialsException("Cannot read authentication data", e);
    }
  }

  private Authentication getAuthentication(AuthRequest request) {
    return new UsernamePasswordAuthenticationToken(request.getLogin(),
        new String(request.getPassword()));
  }
}
