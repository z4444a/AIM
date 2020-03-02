package ru.relex.aim.security.service.impl;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import ru.relex.aim.security.service.IUserSecurityService;

/**
 * Creates authentication used by SuccessHandler to generate token.
 *
 * @author Sorokin Georgy
 */
public class MasterProvider extends DaoAuthenticationProvider {

  private final IUserSecurityService userService;

  /**
   * Constructor.
   */
  public MasterProvider(IUserSecurityService userService) {
    super();
    this.userService = userService;
  }

  @Override
  protected Authentication createSuccessAuthentication(Object principal,
                                                       Authentication authentication, UserDetails user) {
    final var result = new UsernamePasswordAuthenticationToken(
        userService.findByUsername(user.getUsername()), null, user.getAuthorities());
    result.setDetails(authentication.getDetails());
    return result;
  }
}
