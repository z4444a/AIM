package ru.relex.aim.security.ldap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.relex.aim.commons.Role;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.security.mapper.AuthUserMapper;
import ru.relex.aim.security.model.AuthUser;

import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.InitialDirContext;
import java.util.Hashtable;
import java.util.Optional;

/**
 * Responsible for synchronizing user data with LDAP system.
 *
 * @author Nikita Skornyakov
 * @date 22.07.2019
 */
@Service
@EnableConfigurationProperties(LdapProperties.class)
public class UserLdapServiceImpl implements IUserLdapService {

  private static final Logger logger = LoggerFactory.getLogger(UserLdapServiceImpl.class);

  private final LdapProperties properties;
  private final EmployeeRepository repository;
  private final ResourcePoolRepository poolRepository;
  private final AuthUserMapper mapper;

  /**
   * Constructor.
   */
  public UserLdapServiceImpl(LdapProperties properties,
                             EmployeeRepository repository,
                             ResourcePoolRepository poolRepository,
                             AuthUserMapper mapper) {
    this.properties = properties;
    this.repository = repository;
    this.poolRepository = poolRepository;
    this.mapper = mapper;
  }

  /**
   * Synchronizes logged in user data with LDAP system.
   *
   * @param username username to synchronize with LDAP
   * @return Synchronized user data.
   */
  @Override
  public AuthUser synchronizeUser(String username) {

    return repository
        .findByUsernameIgnoreCase(username)
        .or(() -> Optional.of(internalSynchronize(username)))
        .map(this::synchronizeRoleWithDatabasePools)
        .map(mapper::toAuthUser)
        .orElseThrow();
  }

  /**
   * Gives user the POOL_OWNER role if he has a pool and doesn't have a better role.
   */
  private Employee synchronizeRoleWithDatabasePools(Employee employee) {
    final var hasBetterRole = employee.getRole().getPriority() >= Role.POOL_OWNER.getPriority();
    final var doesntHaveAnyPools = poolRepository.getResourcePoolByOwnerId(employee.getId()).isEmpty();
    if (hasBetterRole || doesntHaveAnyPools) {
      return employee;
    }
    employee.setRole(Role.POOL_OWNER);
    return repository.saveAndRefresh(employee);
  }

  /**
   * Creates new user using LDAP data.
   *
   * @param username username or email to find in LDAP
   * @return created user
   */
  private Employee internalSynchronize(String username) {
    try {
      final var env = new Hashtable<String, String>();
      env.put(Context.SECURITY_CREDENTIALS, properties.getPassword());
      env.put(Context.PROVIDER_URL, properties.getHost());
      env.put(Context.SECURITY_PRINCIPAL, properties.getUserBase());
      env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");

      final var ctx = new InitialDirContext(env);
      final var matching = String.format("(|(uid=%s)(email=%s))", username, username);

      final var search = ctx.search(properties.getSearchbase(), matching, null);
      if (!search.hasMore()) {
        throw new UsernameNotFoundException(username);
      }
      final var attributes = search.next().getAttributes();
      final var employee = new Employee();
      employee.setUsername(attributes.get("uid").get().toString());
      final String[] fullNameParts = attributes.get("cn").get().toString().split(" ");
      employee.setFirstName(fullNameParts.length > 0 ? fullNameParts[0] : "");
      employee.setLastName(fullNameParts.length > 1 ? fullNameParts[1] : "");
      employee.setRole(Role.USER);
      return repository.save(employee);
    } catch (NamingException e) {
      logger.error("Failed to Connect to LDAP", e);
      throw new LdapConnectionException(e);
    }
  }
}
