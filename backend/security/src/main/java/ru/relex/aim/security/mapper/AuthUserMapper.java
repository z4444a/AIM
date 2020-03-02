package ru.relex.aim.security.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import ru.relex.aim.commons.Role;
import ru.relex.aim.commons.SystemRole;
import ru.relex.aim.repository.entity.Employee;
import ru.relex.aim.repository.entity.Master;
import ru.relex.aim.security.model.AuthUser;

/**
 * Casts {@link Master} and {@link Employee} to {@link AuthUser}.
 *
 * @author Sorokin Georgy
 */
@Mapper(imports = {SystemRole.class, Role.class})
public interface AuthUserMapper {

  /**
   * Maps employee to AuthUser that can be later retrieved from
   * {@link org.springframework.security.core.context.SecurityContext}.
   */
  @Mapping(target = "id", source = "id")
  @Mapping(target = "username", source = "username")
  @Mapping(target = "role", source = "role")
  @Mapping(target = "fullName", source = "fullName")
  AuthUser toAuthUser(Employee employee);

  /**
   * Maps user role into spring granted authority.
   *
   * @param role role to map
   * @return spring granted authority
   */
  default GrantedAuthority asAuthority(Role role) {
    if (role == null) {
      return null;
    }
    return new SimpleGrantedAuthority(role.getName());
  }
}
