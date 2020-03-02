package ru.relex.aim.security.service.impl;

import java.util.Set;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.security.mapper.AuthUserMapper;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.security.service.IUserSecurityService;

/**
 * Implements {@link IUserSecurityService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class UserSecurityServiceImpl implements IUserSecurityService {

  private final EmployeeRepository employeeRepository;
  private final AuthUserMapper mapper;

  /**
   * Constructor.
   * All parameters are required.
   *
   * @param employeeRepository finds other users
   * @param mapper casts to CurrentUser dto
   */
  public UserSecurityServiceImpl(
      EmployeeRepository employeeRepository,
      AuthUserMapper mapper) {
    this.employeeRepository = employeeRepository;
    this.mapper = mapper;
  }

  @Override
  public Authentication getAuthentication(String username) {
    return employeeRepository
               .findByUsernameIgnoreCase(username)
               .map(mapper::toAuthUser)
               .map(x -> new UsernamePasswordAuthenticationToken(x, null, Set.of(mapper.asAuthority(x.getRole()))))
               .orElseThrow(() -> new UsernameNotFoundException("User: [" + username + "] not found in the system"));
  }

  @Override
  public AuthUser findByUsername(String id) {
    return employeeRepository
               .findByUsernameIgnoreCase(id)
               .map(mapper::toAuthUser)
               .orElseThrow();
  }

}
