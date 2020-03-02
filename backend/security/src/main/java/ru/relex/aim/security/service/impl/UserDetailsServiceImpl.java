package ru.relex.aim.security.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.relex.aim.repository.repository.MasterRepository;
import ru.relex.aim.security.model.Details;

/**
 * Implements {@link UserDetailsService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final MasterRepository repository;

  /**
   * Constructor.
   * Parameter is required.
   * @param repository is used to find user's data by login
   */
  public UserDetailsServiceImpl(final MasterRepository repository) {
    this.repository = repository;
  }

  /**
   * Used in dao service to check user.
   *
   * @param username is user's login
   * @return {@link UserDetails} object with user's login, password and authorities
   * @throws UsernameNotFoundException if user has not been found in repository
   */
  @Override
  public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
    return repository
        .findById(username)
        .map(Details::new)
        .orElseThrow(
            () -> new UsernameNotFoundException("User " + username + "not found"));
  }

}
