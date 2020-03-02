package ru.relex.aim.service.model.create;


import javax.validation.Valid;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierUnique;

import javax.validation.constraints.NotNull;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.Parameter}
 * Used for creating new instance from client data.
 *
 * @author Dmitriy Poshevelya
 */
@ParameterIdentifierUnique
public class ParameterCreateDto extends AbstractParameterDto {

  @NotNull(message = NOT_NULL + PARAM_CONSTR)
  @Valid
  private ParameterConstraintCreateDto constraint;

  @Override
  public ParameterConstraintCreateDto getConstraint() {
    return constraint;
  }

  public void setConstraint(ParameterConstraintCreateDto constraint) {
    this.constraint = constraint;
  }
}
