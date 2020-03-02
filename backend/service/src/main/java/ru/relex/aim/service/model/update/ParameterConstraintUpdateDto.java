package ru.relex.aim.service.model.update;

import java.util.List;
import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;

/**
 * DTO class for {@link ru.relex.aim.repository.entity.ParameterConstraint}.
 * Used by client to update an entity.
 *
 * @author Alexey Alimov
 */
public class ParameterConstraintUpdateDto extends AbstractParameterConstraintDto {

  private Integer id;

  private List<ListValueUpdateDto> listValues;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public List<ListValueUpdateDto> getListValues() {
    return listValues;
  }

  public void setListValues(List<ListValueUpdateDto> listValues) {
    this.listValues = listValues;
  }
}
