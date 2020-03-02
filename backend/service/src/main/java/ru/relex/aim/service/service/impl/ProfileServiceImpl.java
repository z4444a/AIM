package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.security.model.AuthUser;
import ru.relex.aim.service.mapper.IEmployeeMapper;
import ru.relex.aim.service.model.UserProfileDto;
import ru.relex.aim.service.service.IProfileService;

/**
 * Default implementation of {@link IProfileService}.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
@Service
public class ProfileServiceImpl implements IProfileService {

  private final AuthUser authUser;
  private final IEmployeeMapper mapper;
  private final EmployeeRepository repository;

  /**
   * Constructor.
   */
  public ProfileServiceImpl(AuthUser authUser, IEmployeeMapper mapper,
      EmployeeRepository repository) {
    this.authUser = authUser;
    this.mapper = mapper;
    this.repository = repository;
  }

  /**
   * Retrieves current user profile.
   */
  @Override
  public UserProfileDto getProfile() {
    return repository
               .findById(authUser.getId())
               .map(mapper::fromEmployee)
               .orElseThrow();
  }
}
