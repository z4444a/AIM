package ru.relex.aim.service.sort;

import org.springframework.data.domain.Sort;

/**
 * Implement this with sort enums.
 *
 * @author Alexey Alimov
 */
public interface ISortBuilder {

  /**
   * Makes a Sort object for this column.
   *
   * @param direction direction by which to sort
   */
  Sort getSort(Sort.Direction direction);
}
