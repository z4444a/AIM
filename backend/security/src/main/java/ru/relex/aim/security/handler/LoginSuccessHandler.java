package ru.relex.aim.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.relex.aim.security.model.AuthResponse;
import ru.relex.aim.security.model.AuthResponseWithUser;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.security.service.IPostLoginHandler;
import ru.relex.aim.security.service.ITokenService;

/**
 * Forms response with {@link AuthResponse} if authentication is successful.
 *
 * @author Sorokin Georgy
 */
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

  private final ITokenService tokenService;
  private final ObjectMapper mapper;
  private final List<IPostLoginHandler> postLoginHandlers;

  /**
   * Constructor.
   * Parameter is required.
   *
   * @param tokenService generates authentication response which contains access- and refresh-token.
   */
  public LoginSuccessHandler(final ITokenService tokenService, ObjectMapper mapper,
      @Autowired(required = false) List<IPostLoginHandler> postLoginHandlers) {
    this.tokenService = tokenService;
    this.mapper = mapper;
    this.postLoginHandlers = postLoginHandlers;
  }

  @Override
  public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response,
      final Authentication authentication) throws IOException {
    response.setCharacterEncoding(request.getCharacterEncoding());
    final var currentUser = (AuthUser) authentication.getPrincipal();
    final String id = currentUser.getUsername();
    final AuthResponse authResponse = tokenService.generateToken(id);
    response.setStatus(HttpServletResponse.SC_OK);

    try (var writer = response.getWriter()) {
      mapper.writeValue(writer, new AuthResponseWithUser(authResponse, currentUser));
    }

    if (postLoginHandlers != null) {
      postLoginHandlers.forEach(x -> x.userLoggedIn(currentUser));
    }
  }
}
