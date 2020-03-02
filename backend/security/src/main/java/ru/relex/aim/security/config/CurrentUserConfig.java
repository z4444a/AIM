package ru.relex.aim.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.WebApplicationContext;
import ru.relex.aim.security.model.AuthUser;

/**
 * Configuration responsible for providing current user status to services.
 *
 * @author Nikita Skornyakov
 * @date 19.07.2019
 */
@Configuration
public class CurrentUserConfig {

  /**
   * Retrieves current user for current request.
   *
   * @return current user.
   */
  @Bean
  @Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
  public AuthUser getCurrentUser() {
    final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal == null) {
      throw new IllegalStateException("Current user must be set");
    }

    if (principal instanceof AuthUser) {
      return (AuthUser) principal;
    }

    throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
  }
}
