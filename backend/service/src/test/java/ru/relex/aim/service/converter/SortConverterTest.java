package ru.relex.aim.service.converter;

import java.util.List;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.core.convert.converter.Converter;

/**
 * @author Nikita Skornyakov
 * @date 29.05.2019
 */
@TestInstance(Lifecycle.PER_CLASS)
class SortConverterTest extends AbstractConverterTest {

  private static final List<Converter<?, ?>> CONVERTERS = List.of(new EmployeeSortConverter(),
      new RequestSortConverter(),
      new ResourcePoolSortConverter(),
      new ResourceTypeSortConverter());

  @Override
  protected String valueExtractorMethodName() {
    return "getColumnName";
  }

  @Override
  protected List<Converter<?, ?>> converters() {
    return CONVERTERS;
  }

}
