package ru.relex.aim.security.ldap;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.authentication.LdapAuthenticator;
import ru.relex.aim.security.intranet.UserService;

import java.util.Set;
import ru.relex.aim.security.mapper.AuthUserMapper;

/**
 * Creates authentication used by SuccessHandler to generate token.
 *
 * @author Sorokin Georgy
 */
public class LdapProvider extends LdapAuthenticationProvider {

  private final UserService userService;
  private final AuthUserMapper mapper;

  /**
   * Constructor.
   * All parameters are required.
   */
  public LdapProvider(LdapAuthenticator authenticator, UserService userService,
      AuthUserMapper mapper) {
    super(authenticator);
    this.userService = userService;
    this.mapper = mapper;
  }

  @Override
  protected Authentication createSuccessfulAuthentication(
      UsernamePasswordAuthenticationToken authentication, UserDetails user) {
    final String login = authentication.getName();
    final var currentUser = userService.getAuthUser(login);
    final var role = Set.of(mapper.asAuthority(currentUser.getRole()));
    final var result = new UsernamePasswordAuthenticationToken(currentUser, null, role);
    result.setDetails(authentication.getDetails());
    return result;
  }
}
