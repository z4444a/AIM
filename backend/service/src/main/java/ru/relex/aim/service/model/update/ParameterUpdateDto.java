package ru.relex.aim.service.model.update;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.validation.annotation.ForeignKeyMatch;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierUnique;

import static ru.relex.aim.service.validation.code.ConstraintCode.*;
import static ru.relex.aim.service.validation.code.ParameterCode.*;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.Parameter}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
@ParameterIdentifierUnique
@ForeignKeyMatch(message = MISMATCH + PARAM_CONSTR_ID)
public class ParameterUpdateDto extends AbstractParameterDto {

  private Integer id;

  @NotNull(message = NOT_NULL + PARAM_CONSTR)
  @Valid
  private ParameterConstraintUpdateDto constraint;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public ParameterConstraintUpdateDto getConstraint() {
    return constraint;
  }

  public void setConstraint(ParameterConstraintUpdateDto constraint) {
    this.constraint = constraint;
  }
}
