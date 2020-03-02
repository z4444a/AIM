package ru.relex.aim.service.validation.validator;

import org.springframework.transaction.annotation.Transactional;
import ru.relex.aim.commons.ParameterType;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.service.model.base.AbstractParameterValueDto;
import ru.relex.aim.service.validation.annotation.SatisfiesValues;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Collection;
import java.util.Collections;

/**
 * Validation annotation for checking if
 * parameter value satisfies all specified constraints
 * in {@link AbstractParameterValueDto}.
 *
 * @author Nastya Zinchenko
 */
public class SatisfiesValuesValidator implements ConstraintValidator<SatisfiesValues, AbstractParameterValueDto> {

  private final ParameterRepository parameterRepository;
  private final ParameterConstraintValidator paramConstrValidator;

  /**
   * Constructor.
   */
  public SatisfiesValuesValidator(ParameterRepository parameterRepository,
                                  ParameterConstraintValidator paramConstrValidator) {
    this.parameterRepository = parameterRepository;
    this.paramConstrValidator = paramConstrValidator;
  }

  @Override
  @Transactional
  public boolean isValid(AbstractParameterValueDto dto, ConstraintValidatorContext context) {
    if (dto == null) {
      return true;
    }

    final Parameter parameter = parameterRepository
        .findById(dto.getParameterId())
        .orElse(null);

    if (parameter == null) {
      return true;
    }
    final var paramType = ParameterType.getValue(parameter.getParameterType().getId());

    switch (paramType) {
      case NUMBER:
        return paramConstrValidator.checkNumberConstraints(dto.getNumberValue(), parameter)
            .isValid();
      case DATE:
        return paramConstrValidator.checkDateConstraints(dto.getDateValue(), parameter)
            .isValid();
      case TEXT:
        return paramConstrValidator.checkTextConstraints(dto.getStringValue(), parameter)
            .isValid();
      case LIST:
        return paramConstrValidator.checkListConstraints(fetchValueList(dto), parameter)
            .isValid();
      case REAL:
        return paramConstrValidator.checkRealConstraint(dto.getRealValue(), parameter)
            .isValid();
      default:
        return true;
    }
  }

  private Collection<Integer> fetchValueList(AbstractParameterValueDto dto) {
    final var listValue = dto.getListValue();
    return listValue == null || listValue.getId() == null
        ? null
        : Collections.singletonList(listValue.getId());
  }
}
