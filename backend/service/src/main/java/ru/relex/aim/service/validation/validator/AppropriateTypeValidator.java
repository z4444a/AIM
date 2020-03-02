package ru.relex.aim.service.validation.validator;

import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.service.model.base.AbstractResourcePoolDto;
import ru.relex.aim.service.validation.annotation.AppropriateType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Validation annotation for checking if
 * selected resource type equals to parameters types
 * in {@link AbstractResourcePoolDto}.
 *
 * @author Nastya Zinchenko
 */
public class AppropriateTypeValidator implements ConstraintValidator<AppropriateType, AbstractResourcePoolDto> {

  private final ParameterRepository parameterRepository;

  /**
   * Constructor.
   */
  public AppropriateTypeValidator(ParameterRepository parameterRepository) {
    this.parameterRepository = parameterRepository;
  }

  @Override
  public boolean isValid(AbstractResourcePoolDto dto, ConstraintValidatorContext context) {
    if (dto == null) {
      return true;
    }

    final var parameterValues = dto.getParametersValues();

    if (parameterValues == null || parameterValues.isEmpty()) {
      return true;
    }

    for (final var x : parameterValues) {
      final Integer id = parameterRepository
          .findById(x.getParameterId())
          .map(Parameter::getResourceType)
          .map(ResourceType::getId)
          .orElse(null);
      if (id == null || !id.equals(dto.getResourceTypeId())) {
        return false;
      }
    }
    return true;
  }
}
