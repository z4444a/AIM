package ru.relex.aim.service.validation.validator;

import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.model.update.ParameterConstraintUpdateDto;
import ru.relex.aim.service.model.update.ParameterUpdateDto;
import ru.relex.aim.service.validation.annotation.ForeignKeyMatch;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ConstrainForeignKeyMatchValidatorTest extends BaseValidatorTest<ForeignKeyMatch, ParameterUpdateDto> {

  @Override
  protected ConstraintValidator<ForeignKeyMatch, ParameterUpdateDto> createValidator() {
    var annotation = ParameterUpdateDto.class.getAnnotation(ForeignKeyMatch.class);
    var validator = new ConstraintForeignKeyMatchValidator();
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<ForeignKeyMatch> annotation() {
    return ForeignKeyMatch.class;
  }

  @Test
  @DisplayName("Check that Validator accepts nulls correctly")
  void testConstrainForeignKeyMatchValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that Validator accepts nulls constraint")
  void testConstrainForeignKeyMatchValidator_onNoConstraint() {
    var dto = new ParameterUpdateDto();
    dto.setConstraint(null);
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts valid keys")
  void testConstrainForeignKeyMatchValidator_onValidKeys() {
    var dto = new ParameterUpdateDto();
    var constraintDto = new ParameterConstraintUpdateDto();

    dto.setId(1);
    constraintDto.setId(1);
    dto.setConstraint(constraintDto);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts null keys")
  void testConstrainForeignKeyMatchValidator_onNullKeys() {
    var dto = new ParameterUpdateDto();
    var constraintDto = new ParameterConstraintUpdateDto();

    dto.setId(null);
    constraintDto.setId(null);
    dto.setConstraint(constraintDto);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts null parameter key and not null constraint key.")
  void testConstrainForeignKeyMatchValidator_onNullParameterKey() {
    var dto = new ParameterUpdateDto();
    var constraintDto = new ParameterConstraintUpdateDto();

    dto.setId(null);
    constraintDto.setId(1);
    dto.setConstraint(constraintDto);

    Assertions.assertFalse(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts null constraint key and not null parameter key")
  void testConstrainForeignKeyMatchValidator_onNullConstraintKey() {
    var dto = new ParameterUpdateDto();
    var constraintDto = new ParameterConstraintUpdateDto();

    dto.setId(1);
    constraintDto.setId(null);
    dto.setConstraint(constraintDto);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts invalid keys")
  void testConstrainForeignKeyMatchValidator_onInvalidKeys() {
    var dto = new ParameterUpdateDto();
    var constraintDto = new ParameterConstraintUpdateDto();

    dto.setId(1);
    constraintDto.setId(2);
    dto.setConstraint(constraintDto);

    Assertions.assertFalse(validateOn(dto));
  }
}
