package ru.relex.aim.repository.converter;

import ru.relex.aim.repository.entity.RequestState;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Objects;

/**
 * {@link AttributeConverter} implementation for request state.
 *
 * @author Sorokin Georgy
 */
@Converter(autoApply = true)
public class RequestStateConverter implements AttributeConverter<RequestState, Integer> {

  @Override
  public Integer convertToDatabaseColumn(RequestState attribute) {
    Objects.requireNonNull(attribute, "State cannot be null set");
    return attribute.getId();

  }

  @Override
  public RequestState convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "State cannot be null set");
    return RequestState.fromId(dbData);
  }
}
