package ru.relex.aim.repository.converter;

import ru.relex.aim.repository.entity.AllocationType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Objects;

/**
 * {@link AttributeConverter} implementation for allocation type.
 *
 * @author Sorokin Georgy
 */
@Converter(autoApply = true)
public class AllocationTypeConverter implements AttributeConverter<AllocationType, Integer> {

  @Override
  public Integer convertToDatabaseColumn(AllocationType attribute) {
    Objects.requireNonNull(attribute, "Status cannot be null set");
    return attribute.getId();

  }

  @Override
  public AllocationType convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "Status cannot be null set");
    return AllocationType.fromId(dbData);
  }
}
