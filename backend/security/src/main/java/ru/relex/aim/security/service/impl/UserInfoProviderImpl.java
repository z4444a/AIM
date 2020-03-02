package ru.relex.aim.security.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.security.model.Details;
import ru.relex.aim.security.service.UserInfoProvider;

/**
 * Provider of current system user login.
 */
@Component
public class UserInfoProviderImpl implements UserInfoProvider {
  @Override
  public Details getCurrentUserDetail() {
    final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (Details) authentication.getDetails();
  }

  @Override
  public boolean isAdmin() {
    final var currentUser = getCurrentUserDetail();
    return currentUser.getAuthorities()
        .stream()
        .map(item -> item.toString())
        .anyMatch(item -> item.equals(SystemRole.ADMIN));
  }
}
