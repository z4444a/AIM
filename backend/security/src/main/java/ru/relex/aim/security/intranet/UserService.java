package ru.relex.aim.security.intranet;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.security.intranet.model.exception.IntranetException;
import ru.relex.aim.security.intranet.model.result.User;
import ru.relex.aim.security.intranet.model.result.UserList;
import ru.relex.aim.security.ldap.IUserLdapService;
import ru.relex.aim.security.mapper.SecurityEmployeeMapper;
import ru.relex.aim.security.model.AuthUser;

/**
 * Manages {@link ru.relex.aim.repository.entity.Employee}.
 *
 * @author Sorokin Georgy
 */
@Service
@Transactional
public class UserService {

  private final IntranetProvider intranetProvider;
  private final EmployeeRepository employeeRepository;
  private final SecurityEmployeeMapper employeeMapper;
  private final IUserLdapService ldapService;

  /**
   * Constructor. All parameters are required.
   */
  public UserService(@Autowired(required = false) IntranetProvider intranetProvider,
      EmployeeRepository employeeRepository,
      SecurityEmployeeMapper employeeMapper, IUserLdapService ldapService) {
    this.intranetProvider = intranetProvider;
    this.employeeRepository = employeeRepository;
    this.employeeMapper = employeeMapper;
    this.ldapService = ldapService;
  }

  /**
   * Synchronizes intranet users and database employees.
   *
   * @throws IntranetException sends a message to the client
   */
  public void synchronize() {
    if (intranetProvider == null) {
      return; //do nothing
    }
    try {
      final var users = intranetProvider.post(null, "users", null, UserList.class).getUsers();
      final List<Employee> employees = users
                                           .stream()
                                           .map(this::mapUser)
                                           .collect(Collectors.toList());
      employeeRepository.deleteAll();
      employeeRepository.saveAll(employees);
    } catch (IOException e) {
      throw new IntranetException(e);
    }
  }

  /**
   * Receives user from the intranet.
   *
   * @param login request params
   * @return user as employee
   */
  public AuthUser getAuthUser(String login) {
    return ldapService.synchronizeUser(login);
  }

  /**
   * Translates user data to employee.
   */
  @Transactional(readOnly = true)
  public Employee mapUser(User user) {
    final Employee employee = employeeRepository.findById(user.getId()).orElse(new Employee());
    return employeeMapper.toEmployee(user, employee);
  }
}
