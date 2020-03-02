package ru.relex.aim.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.Master;

import java.util.Collection;
import java.util.Set;

/**
 * Implements {@link UserDetails}.
 * Contains user's data: username(login), password and authorities.
 */
public class Details implements UserDetails {
  private static final long serialVersionUID = -8434831582045464489L;
  private final String username;
  private final String password;
  private final Integer employeeId;
  private final Collection<SimpleGrantedAuthority> authorities;

  /**
   * Constructor.
   * All parameters are required.
   */
  public Details(Master master) {
    username = master.getLogin();
    password = new String(master.getPassword());
    employeeId = master.getEmployee().getId();
    authorities = Set.of(new SimpleGrantedAuthority(SystemRole.ADMIN));
  }

  /**
   * Creates Details object from {@link Employee}.
   *
   * @param employee {@link Employee} object to convert
   */
  public Details(Employee employee) {
    username = employee.getFirstName();
    password = "";
    employeeId = employee.getId();
    authorities = Set.of(new SimpleGrantedAuthority(employee.getRole().getName()));
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Integer getEmployeeId() {
    return employeeId;
  }
}
