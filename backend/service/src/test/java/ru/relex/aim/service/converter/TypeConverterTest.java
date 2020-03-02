package ru.relex.aim.service.converter;

import java.util.List;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.core.convert.converter.Converter;

/**
 * Tests for generic type-to-enum converters.
 *
 * @author Nikita Skornyakov
 * @date 29.05.2019
 */
@TestInstance(Lifecycle.PER_CLASS)
public class TypeConverterTest extends AbstractConverterTest {

  private static final List<Converter<?, ?>> CONVERTERS = List.of(new ProjectStatusConverter());

  @Override
  protected String valueExtractorMethodName() {
    return "getName";
  }

  @Override
  protected List<Converter<?, ?>> converters() {
    return CONVERTERS;
  }
}
