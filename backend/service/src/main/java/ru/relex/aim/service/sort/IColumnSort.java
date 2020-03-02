package ru.relex.aim.service.sort;

/**
 * Basic interface for enums that represents column (or columns) that used to sort data in requests.
 *
 * @author Nikita Skornyakov
 * @date 29.05.2019
 */
public interface IColumnSort {

  /**
   * Retrieves column(s) name that will be passed to database queries.
   *
   * @return string name of columns that can be passed to HQL query.
   */
  String getColumnName();
}
