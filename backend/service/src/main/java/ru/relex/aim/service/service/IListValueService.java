package ru.relex.aim.service.service;

import java.util.List;
import ru.relex.aim.service.model.get.ListValueGetDto;

/**
 * Manages {@link ru.relex.aim.repository.entity.ListValue}.
 *
 * @author Alexey Alimov
 */
public interface IListValueService {

  /**
   * Retrieves a list of {@link ListValueGetDto}
   * by given parameter id.
   * @param parameterId parameter identifier by which to search.
   * @return if none found returns empty list.
   */
  List<ListValueGetDto> getAllByParameterId(int parameterId);
}
