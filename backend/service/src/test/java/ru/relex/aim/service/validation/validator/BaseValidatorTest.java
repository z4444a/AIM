package ru.relex.aim.service.validation.validator;

import org.junit.jupiter.api.BeforeAll;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
import java.util.function.BooleanSupplier;

/**
 * Base class to implement Tests for {@link ConstraintValidator}
 *
 * @param <A> annotation type that is used for validation
 * @param <T> Entity type that should be validated
 */
public abstract class BaseValidatorTest<A extends Annotation, T> {

  private ConstraintValidator<A, T> validator;

  protected abstract ConstraintValidator<A, T> createValidator();

  /**
   * Initialized validator with specified annotation.
   *
   * @param annotation annotation instance to init
   */
  final void initValidator(A annotation) {
    validator.initialize(annotation);
  }

  /**
   * Creates validator instance. Since validators state can only be changed by calling initialize this method
   * can be called only once.
   *
   * @see BeforeAll
   */
  @BeforeAll
  void setupValidator() {
    validator = createValidator();
  }

  /**
   * Retrieves class-level annotation.
   *
   * @param clazz class to retrieve validator annotation
   * @return annotation instance
   * @throws NullPointerException     if given clazz is null
   * @throws IllegalArgumentException if annotation is not found on given class
   */
  protected final A classAnnotation(Class<?> clazz) {
    A annotaion = clazz.getAnnotation(annotation());
    if (annotaion == null) {
      throw new IllegalArgumentException("Annotation not found");
    }

    return annotaion;
  }

  /**
   * Retrieves annotation for specific class field
   *
   * @param clazz     class to extract annotation
   * @param fieldName name of annotated field
   * @return annotation instance
   * @throws NullPointerException     if {@code clazz} or {@code fieldName} is null
   * @throws IllegalArgumentException if field with given name is not found in class or field not annotated
   */
  protected final A fieldAnnotation(Class<?> clazz, String fieldName) {
    try {
      A annotation = clazz.getField(fieldName).getAnnotation(annotation());
      if (annotation == null) {
        throw new NoSuchFieldException();
      }
      return annotation;
    } catch (NoSuchFieldException e) {
      throw new IllegalArgumentException("Invalid field name was passed", e);
    }
  }

  /**
   * @return annotation class
   * @apiNote if implementation of this method returns null, then usage of methods
   * {@link #classAnnotation(Class)} and {@link #fieldAnnotation(Class, String)} will throw exception.
   */
  protected abstract Class<A> annotation();

  /**
   * Provides supplier that invokes {@link ConstraintValidator#isValid(Object, ConstraintValidatorContext)} method
   * with default {@link ConstraintValidatorContext} mock.
   *
   * @param object object to be validated
   * @return supplier that can be called to invoke isValid method.
   */
  final BooleanSupplier validateOn(T object) {

    return () -> validator.isValid(object, ConstraintValidatorContextFactory.buildDefaultContext());
  }
}
