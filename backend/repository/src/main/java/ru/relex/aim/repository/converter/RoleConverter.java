package ru.relex.aim.repository.converter;

import java.util.Objects;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import ru.relex.aim.commons.Role;

/**
 * {@link AttributeConverter} implementation for user roles.
 *
 * @author Nikita Skornyakov
 * @date 24.06.2019
 */
@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<Role, Integer> {

  @Override
  public Integer convertToDatabaseColumn(Role attribute) {
    Objects.requireNonNull(attribute, "Role cannot be null set");
    return attribute.getId();

  }

  @Override
  public Role convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "Role cannot be null set");
    return Role.fromId(dbData);
  }
}
