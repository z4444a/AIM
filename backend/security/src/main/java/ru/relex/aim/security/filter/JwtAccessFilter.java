package ru.relex.aim.security.filter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.relex.aim.security.config.ErrorResponseCode;
import ru.relex.aim.security.config.Url;
import ru.relex.aim.security.service.ITokenService;
import ru.relex.aim.security.service.IUserSecurityService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.NoSuchElementException;

/**
 * Authenticates the first user if his access token is correct and valid.
 *
 * @author Sorokin Georgy
 */
@Component
public class JwtAccessFilter extends OncePerRequestFilter {

  private final ITokenService tokenService;
  private final IUserSecurityService service;

  /**
   * Constructor.
   *  All parameters are required.
   * @param tokenService is used to retrieve user's login from access-token body
   * @param service checks login.
   *               If it is contained in database user will be authenticated.
   */
  public JwtAccessFilter(final ITokenService tokenService, IUserSecurityService service) {
    super();
    this.tokenService = tokenService;
    this.service = service;
  }

  @Override
  protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                  final FilterChain filterChain) throws ServletException, IOException {
    if (request.getRequestURI().equalsIgnoreCase(request.getContextPath() + Url.REFRESH)
        || request.getRequestURI().equalsIgnoreCase(request.getContextPath() + Url.INITIALIZE)
        || request.getRequestURI().equalsIgnoreCase(request.getContextPath() + Url.LOGIN)) {  
      filterChain.doFilter(request, response);
      return;
    }

    final var token = tokenService.readToken(request);

    if (token == null || token.getBody().containsKey("refresh")) {
      response.setStatus(ErrorResponseCode.BAD_ACCESS_TOKEN);
      return;
    }

    final String login = token.getBody().getSubject();

    Authentication auth;
    try {
      auth = service.getAuthentication(login);
    } catch (NoSuchElementException e) {
      response.setStatus(ErrorResponseCode.BAD_ACCESS_TOKEN);
      return;
    }

    SecurityContextHolder.getContext().setAuthentication(auth);    
    filterChain.doFilter(request, response);
  }
}
