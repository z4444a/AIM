package ru.relex.aim.security.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.relex.aim.security.config.Url;
import ru.relex.aim.security.ldap.LdapProvider;
import ru.relex.aim.security.model.AuthRequest;
import ru.relex.aim.security.model.AuthResponse;
import ru.relex.aim.security.model.AuthResponseWithUser;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.security.service.IMasterService;
import ru.relex.aim.security.service.ITokenService;
import ru.relex.aim.security.service.IUserSecurityService;

/**
 * Initializes the first user.
 *
 * @author Sorokin Georgy
 */
@RestController
@RequestMapping(Url.INITIALIZE)
public class SecurityController {

  private final IMasterService service;

  private final ITokenService tokenService;

  private final IUserSecurityService userSecurityService;

  private final LdapProvider ldapProvider;

  private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);

  /**
   * Create instance of current class.
   *
   * @param service is object of the first user's service
   * @param tokenService generates authentication tokens
   * @param userSecurityService receives user dto by login
   */
  public SecurityController(IMasterService service,
      ITokenService tokenService,
      IUserSecurityService userSecurityService, LdapProvider ldapProvider) {
    this.service = service;
    this.tokenService = tokenService;
    this.userSecurityService = userSecurityService;
    this.ldapProvider = ldapProvider;
  }

  /**
   * Checks that there is the first user in the system.
   *
   * @return true if the check is successful
   */
  @GetMapping
  public Boolean initCheckCount() {
    return service.countMasters() != 0;
  }

  /**
   * Registers the first user using {@link IMasterService}
   * and sets {@link HttpStatus} as not found
   * if the first user has already been registered.
   * Syncs to the intranet if it is possible.
   *
   * @param authRequest contains login and password
   * @return authentication tokens
   */
  @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @Transactional(isolation = Isolation.SERIALIZABLE)
  public AuthResponse initUsers(@RequestBody AuthRequest authRequest) {
    if (service.countMasters() > 0) {
      throw new UserAlreadyExistsException();
    }

    String login;
    try {
      final var authentication = ldapProvider.authenticate(
          new UsernamePasswordAuthenticationToken(authRequest.getLogin(), new String(authRequest.getPassword())));
      final int userId = ((AuthUser) authentication.getPrincipal()).getId();
      login = service.createMaster(userId);
    } catch (AuthenticationException e) {
      //failed to authenticate
      logger.info("Failed to authenticate user using ldap!", e);
      login = service.createMaster(authRequest);
    }

    final var authResponse = tokenService.generateToken(login);
    final var user = userSecurityService.findByUsername(login);
    return new AuthResponseWithUser(authResponse, user);
  }

  /**
   * This exception type used solely to change
   * HTTP response status to {@code 404 (NOT FOUND)}
   * in case of first user is already created and
   * anyone requested create of additional user.
   */
  @ResponseStatus(HttpStatus.NOT_FOUND)
  private class UserAlreadyExistsException extends RuntimeException {

    private static final long serialVersionUID = 6213233266465691505L;
  }
}
