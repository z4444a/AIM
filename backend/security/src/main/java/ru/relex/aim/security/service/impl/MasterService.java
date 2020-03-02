package ru.relex.aim.security.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.commons.Role;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.Master;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.repository.repository.MasterRepository;
import ru.relex.aim.security.mapper.MasterMapper;
import ru.relex.aim.security.model.AuthRequest;
import ru.relex.aim.security.service.IMasterService;

/**
 * Implements {@link IMasterService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class MasterService implements IMasterService {

  private final PasswordEncoder passwordEncoder;
  private final MasterRepository masterRepository;
  private final EmployeeRepository employeeRepository;
  private final MasterMapper masterMapper;

  /**
   * Constructor.
   * All parameters are required.
   *
   * @param passwordEncoder  encodes and decodes the first user's password
   * @param masterRepository allows to save and count users.
   * @param masterMapper     casts authentication request to entity, which represents the first user.
   */
  public MasterService(PasswordEncoder passwordEncoder,
                       MasterRepository masterRepository,
                       MasterMapper masterMapper,
                       EmployeeRepository employeeRepository) {
    this.passwordEncoder = passwordEncoder;
    this.masterRepository = masterRepository;
    this.masterMapper = masterMapper;
    this.employeeRepository = employeeRepository;
  }

  @Transactional
  @Override
  public String createMaster(AuthRequest authRequest) {
    final Master master = masterMapper.toEntity(authRequest);
    master.setPassword(passwordEncoder.encode(new String(master.getPassword())).toCharArray());
    final Employee employee = saveMasterEmployee(master);
    master.setEmployee(employee);
    return masterRepository.save(master).getLogin();
  }

  @Override
  public String createMaster(int userId) {
    return employeeRepository
        .findById(userId)
        .map(x -> {
          x.setRole(Role.ADMIN);
          return employeeRepository.save(x);
        })
        .map(masterMapper::fromEmployee)
        .map(masterRepository::save)
        .map(Master::getLogin)
        .orElseThrow();
  }

  @Override
  public long countMasters() {
    return masterRepository.count();
  }

  /**
   * Saves master entity as employee with admin role.
   *
   * @param master first user
   * @return saved entity
   */
  @Transactional
  public Employee saveMasterEmployee(Master master) {
    final Employee employee = new Employee();
    employee.setUsername(master.getLogin());
    employee.setFirstName(master.getLogin());
    employee.setLastName(master.getLogin());
    employee.setPost("Admin");
    employee.setRole(Role.ADMIN);
    return employeeRepository.saveAndFlush(employee);
  }
}
