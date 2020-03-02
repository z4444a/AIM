package ru.relex.aim.service.converter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Stream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.core.convert.converter.Converter;

/**
 * @author Nikita Skornyakov
 * @date 29.05.2019
 */
abstract class AbstractConverterTest {

  private static Map<Converter<?, ?>, Map.Entry<Class<Enum<?>>, Method>> methodsMap;

  @BeforeAll
  void setup() {
    methodsMap = new HashMap<>();
    for (var converter : converters()) {
      Class<Enum<?>> enumClass = getEnumClass(converter);
      Method getMethod = fromConverterInstance(enumClass);
      methodsMap.put(converter, Map.entry(enumClass, getMethod));
    }
  }

  static Class<Enum<?>> getEnumClass(Converter<?, ?> instance) {
    return (Class<Enum<?>>) Optional
                                .of(instance)
                                .map(Converter::getClass)
                                .map(Class::getMethods)
                                .stream()
                                .flatMap(Arrays::stream)
                                .filter(x -> x.getName().equals("convert"))
                                .filter(Predicate.not(x -> x.isSynthetic()))
                                .findFirst()
                                .map(Method::getReturnType)
                                .orElseThrow();
  }

  Method fromConverterInstance(Class<Enum<?>> enumClass) {
    return Stream
               .of(enumClass)
               .map(Class::getMethods)
               .flatMap(Arrays::stream)
               .flatMap(Stream::of)
               .filter(m -> valueExtractorMethodName().equals(m.getName()))
               .filter(Predicate.not(x -> x.isSynthetic()))
               .findFirst()
               .orElseThrow();
  }

  protected abstract String valueExtractorMethodName();

  protected abstract List<Converter<?, ?>> converters();

  @ParameterizedTest
  @MethodSource("converterEnums")
  void convertNull(Converter<?, ?> converter) {
    Assertions.assertNull(converter.convert(null));
  }

  @ParameterizedTest
  @MethodSource("converterEnums")
  void convertValid(Converter<?, ?> converter)
      throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
    var entry = methodsMap.get(converter);
    var targetEnum = entry.getKey().getEnumConstants()[0];
    var validString = entry.getValue().invoke(targetEnum);

    Assertions.assertEquals(
        converter.getClass().getMethod("convert", validString.getClass()).invoke(converter, validString), targetEnum);
  }

  @ParameterizedTest
  @MethodSource("converterEnums")
  void convertUppercase(Converter<?, ?> converter)
      throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
    var entry = methodsMap.get(converter);
    var targetEnum = entry.getKey().getEnumConstants()[0];
    var validString = entry.getValue().invoke(targetEnum);
    if (validString instanceof String) {
      validString = Character.toLowerCase(((String) validString).charAt(0)) + ((String) validString).toUpperCase().substring(1);
    }

    Assertions.assertEquals(
        converter.getClass().getMethod("convert", validString.getClass()).invoke(converter, validString), targetEnum);
  }

  @ParameterizedTest
  @MethodSource("converterEnums")
  void convertUnknown(Converter<?, ?> converter)
      throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
    var entry = methodsMap.get(converter);
    var targetEnum = entry.getKey().getEnumConstants()[0];
    var validString = entry.getValue().invoke(targetEnum);
    if (validString instanceof String) {
      validString = "some-kind-of-row-that-definitely-does-not-exists";
    } else if (validString instanceof Integer) {
      validString = -9999999;
    }

    Assertions.assertNull(
        converter.getClass().getMethod("convert", validString.getClass()).invoke(converter, validString));
  }

  Stream<Converter<?, ?>> converterEnums() {
    return converters().stream();
  }
}
