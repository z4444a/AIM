package ru.relex.aim.service.model.create;

import java.util.List;
import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;

/**
 * DTO creating class for {@link ru.relex.aim.repository.entity.ParameterConstraint}
 * Used for creating new instance from client data.
 *
 * @author Dmitriy Poshevelya
 */
public class ParameterConstraintCreateDto extends AbstractParameterConstraintDto {
  private List<ListValueCreateDto> listValues;

  @Override
  public List<ListValueCreateDto> getListValues() {
    return listValues;
  }

  public void setListValues(List<ListValueCreateDto> listValues) {
    this.listValues = listValues;
  }
}
