package ru.relex.aim.repository.converter;

import ru.relex.aim.repository.entity.RequestStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Objects;

/**
 * {@link AttributeConverter} implementation for request status.
 *
 * @author Sorokin Georgy
 */
@Converter(autoApply = true)
public class RequestStatusConverter implements AttributeConverter<RequestStatus, Integer> {

  @Override
  public Integer convertToDatabaseColumn(RequestStatus attribute) {
    Objects.requireNonNull(attribute, "Status cannot be null set");
    return attribute.getId();

  }

  @Override
  public RequestStatus convertToEntityAttribute(Integer dbData) {
    Objects.requireNonNull(dbData, "Status cannot be null set");
    return RequestStatus.fromId(dbData);
  }
}
