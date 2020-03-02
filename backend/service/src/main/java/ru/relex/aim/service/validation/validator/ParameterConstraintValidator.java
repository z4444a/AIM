package ru.relex.aim.service.validation.validator;

import org.springframework.stereotype.Component;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.service.model.validator.ParameterConstraintValidatorResult;
import ru.relex.aim.service.validation.code.ConstraintCode;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Represents constraints validator class for parameter fields.
 */
@Component
public class ParameterConstraintValidator {

  /**
   * Validate constraints for real number parameter.
   *
   * @param value     real number value for validation
   * @param parameter {@link Parameter} object with constraints
   * @return object {@link ParameterConstraintValidatorResult} with validation result
   */
  public ParameterConstraintValidatorResult checkRealConstraint(Float value, Parameter parameter) {
    final var validationResult = generalCheck(value, parameter);
    if (validationResult != null) {
      return validationResult;
    }
    final var constraint = parameter.getConstraint();
    if (constraint.getMaxRealValue() != null && value.compareTo(constraint.getMaxRealValue()) > 0) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MAX_NUMBER_VALUE);
    }
    if (constraint.getMinRealValue() != null && value.compareTo(constraint.getMinRealValue()) < 0) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MIN_NUMBER_VALUE);
    }

    return ParameterConstraintValidatorResult.success();
  }

  /**
   * Validate constraints for date parameter.
   *
   * @param value     date value for validation
   * @param parameter {@link Parameter} object with constraints
   * @return object {@link ParameterConstraintValidatorResult} with validation result
   */
  public ParameterConstraintValidatorResult checkDateConstraints(LocalDate value, Parameter parameter) {
    final var validationResult = generalCheck(value, parameter);
    if (validationResult != null) {
      return validationResult;
    }
    final var constraint = parameter.getConstraint();
    final var maxDate = constraint.isMaxDateToday() ? LocalDate.now() : constraint.getMaxDateValue();
    if (maxDate != null && maxDate.isBefore(value)) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MAX_DATE_VALUE);
    }
    final var minDate = constraint.isMinDateToday() ? LocalDate.now() : constraint.getMinDateValue();
    if (minDate != null && minDate.isAfter(value)) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MIN_DATE_VALUE);
    }
    return ParameterConstraintValidatorResult.success();
  }

  /**
   * Validate constraints for text parameter.
   *
   * @param value     string value for validation
   * @param parameter {@link Parameter} object with constraints
   * @return object {@link ParameterConstraintValidatorResult} with validation result
   */
  public ParameterConstraintValidatorResult checkTextConstraints(String value, Parameter parameter) {
    final var validationResult = generalCheck(value, parameter);
    if (validationResult != null) {
      return validationResult;
    }
    final var constraint = parameter.getConstraint();
    final var maxLen = constraint.getMaxStringLength();

    if (maxLen != null && value.length() > maxLen) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MAX_STRING_LENGTH);
    }
    final var regex = constraint.getRegExp();
    if (regex == null) {
      return ParameterConstraintValidatorResult.success();
    }
    try {
      final var pattern = Pattern.compile(regex);
      final var matcher = pattern.matcher(value);
      if (!matcher.matches()) {
        return ParameterConstraintValidatorResult.failed(parameter.getId(), ConstraintCode.REGEX_MISMATCH);
      }
    } catch (IllegalArgumentException ignore) {
      return ParameterConstraintValidatorResult.success();//ignore the constraint if the stored regex contains errors.
    }

    return ParameterConstraintValidatorResult.success();
  }

  /**
   * Validate constraints for list parameter.
   *
   * @param value     collection of identifiers with field values
   * @param parameter {@link Parameter} object with constraints
   * @return object {@link ParameterConstraintValidatorResult} with validation result
   */
  public ParameterConstraintValidatorResult checkListConstraints(Collection<Integer> value, Parameter parameter) {
    if (parameter == null) {
      return ParameterConstraintValidatorResult.success();
    }
    final var isEmptyValue = value == null || value.isEmpty();

    if (parameter.getRequired() && isEmptyValue) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.NOT_NULL);
    }
    final Set<Integer> availableParameters = (parameter.getListValues() == null || parameter.getListValues().isEmpty())
        ? Set.of()
        : parameter.getListValues().stream()
        .map(valueItem -> valueItem.getId()).collect(Collectors.toUnmodifiableSet());
    if (!isEmptyValue) {
      final var allValueAvailable = value.stream().allMatch(valueItem -> availableParameters.contains(valueItem));
      if (!allValueAvailable) {
        return ParameterConstraintValidatorResult.failed(parameter.getId(),
            ConstraintCode.UNAVAILABLE_VALUE);
      }
    }

    return ParameterConstraintValidatorResult.success();
  }

  /**
   * Validate constraints for number parameter.
   *
   * @param value     number value for validation
   * @param parameter {@link Parameter} object with constraints
   * @return object {@link ParameterConstraintValidatorResult} with validation result
   */
  public ParameterConstraintValidatorResult checkNumberConstraints(Integer value, Parameter parameter) {
    final var validationResult = generalCheck(value, parameter);
    if (validationResult != null) {
      return validationResult;
    }
    final var constraint = parameter.getConstraint();
    if (constraint.getMaxNumberValue() != null && value > constraint.getMaxNumberValue()) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MAX_NUMBER_VALUE);
    }
    if (constraint.getMinNumberValue() != null && value < constraint.getMinNumberValue()) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(),
          ConstraintCode.MIN_NUMBER_VALUE);
    }

    return ParameterConstraintValidatorResult.success();
  }

  private ParameterConstraintValidatorResult checkRequiredConstraint(Parameter parameter, Object value) {
    if (parameter.getRequired() && value == null) {
      return ParameterConstraintValidatorResult.failed(parameter.getId(), ConstraintCode.NOT_NULL);
    }

    return ParameterConstraintValidatorResult.success();
  }

  private ParameterConstraintValidatorResult generalCheck(Object value, Parameter parameter) {
    if (parameter == null) {
      return ParameterConstraintValidatorResult.success();
    }
    final var requiredConstraint = checkRequiredConstraint(parameter, value);
    if (!requiredConstraint.isValid()) {
      return requiredConstraint;
    }
    final var constraint = parameter.getConstraint();
    if (constraint == null || value == null) {
      return ParameterConstraintValidatorResult.success();
    }
    return null;
  }
}
