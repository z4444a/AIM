package ru.relex.aim.repository.converter;

import ru.relex.aim.commons.modifier.ParameterModifier;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Objects;

/**
 * {@link AttributeConverter} implementation for parameter modifier.
 *
 * @author Sorokin Georgy
 */
@Converter(autoApply = true)
public class ParameterModifierConverter implements AttributeConverter<ParameterModifier, Integer> {

  @Override
  public Integer convertToDatabaseColumn(ParameterModifier attribute) {
    Objects.requireNonNull(attribute, "Modifier cannot be null set");
    return attribute.getId();
  }

  @Override
  public ParameterModifier convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "Modifier cannot be null set");
    return ParameterModifier.fromId(dbData);
  }
}
