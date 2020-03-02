package ru.relex.aim.service.validation.validator;

import static java.util.stream.Collectors.toList;

import java.util.Objects;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.model.base.AbstractResourceTypeDto;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.validation.annotation.UniqueNames;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Validation class for
 * checking that {@link  ResourceTypeCreateDto}
 * doesn't have duplicate parameters by name.
 *
 * @author Dmitriy Poshevelya
 */
public class ParameterNameValidator implements
    ConstraintValidator<UniqueNames, AbstractResourceTypeDto> {

  @Override
  public boolean isValid(AbstractResourceTypeDto value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    final var param = value.getParameters();

    if (param == null) {
      return true;
    }

    final var expectedSize = param.size();

    if (expectedSize == 0) {
      return true;
    }

    final var names = param
        .stream()
        .map(AbstractParameterDto::getName)
        .collect(toList());

    if (names.stream().anyMatch(Objects::isNull)) {
      return true;
    }

    final var resultSize = names
        .stream()
        .map(String::toLowerCase)
        .distinct()
        .count();

    return expectedSize == resultSize;
  }
}
