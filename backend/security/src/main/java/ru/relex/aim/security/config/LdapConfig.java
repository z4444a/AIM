package ru.relex.aim.security.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.search.FilterBasedLdapUserSearch;
import ru.relex.aim.security.intranet.UserService;
import ru.relex.aim.security.ldap.LdapProperties;
import ru.relex.aim.security.ldap.LdapProvider;
import ru.relex.aim.security.mapper.AuthUserMapper;

/**
 * Allows access to ldap.
 *
 * @author Sorokin Georgy
 */
@Configuration
@EnableConfigurationProperties(LdapProperties.class)
public class LdapConfig {

  private final LdapProperties ldap;
  private final UserService userService;
  private final AuthUserMapper mapper;

  /**
   * Constructor.
   * All parameters are required.
   *
   * @param ldap contains properties for access to ldap
   * @param userService used to retrieve current user
   */
  public LdapConfig(LdapProperties ldap, UserService userService, AuthUserMapper mapper) {
    this.ldap = ldap;
    this.userService = userService;
    this.mapper = mapper;
  }

  /**
   * Allows spring to configure ldap authentication
   * using ldap properties from {@link LdapProperties}.
   *
   * @return provider which is used to authenticate ldap user
   */
  @Bean
  public AuthenticationProvider ldapProvider() {
    final DefaultSpringSecurityContextSource context = new DefaultSpringSecurityContextSource(ldap.getHost());
    context.setUserDn(ldap.getUserBase());
    context.setPassword(ldap.getPassword());
    context.afterPropertiesSet();
    final var ldapUserSearch = new FilterBasedLdapUserSearch(ldap.getSearchbase(), "(|(uid={0})(mail={0}))", context);
    final BindAuthenticator bindAuthenticator = new BindAuthenticator(context);
    bindAuthenticator.setUserSearch(ldapUserSearch);
    return new LdapProvider(bindAuthenticator, userService, mapper);
  }
}
