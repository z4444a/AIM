package ru.relex.aim.service.validation.validator;

import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;
import ru.relex.aim.service.model.base.AbstractRequestDto;
import ru.relex.aim.service.model.create.ParameterConstraintCreateDto;
import ru.relex.aim.service.validation.annotation.NumberRange;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ConstraintNumberRangeValidatorTest extends BaseValidatorTest<NumberRange, AbstractParameterConstraintDto> {

  @Override
  protected ConstraintValidator<NumberRange, AbstractParameterConstraintDto> createValidator() {
    var annotation = AbstractRequestDto.class.getAnnotation(NumberRange.class);
    var validator = new ConstraintNumberRangeValidator();
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<NumberRange> annotation() {
    return NumberRange.class;
  }

  @Test
  @DisplayName("Check that validator accepts nulls correctly")
  void testCreateConstraintDateFrameValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts null min number")
  void testCreateConstraintDateFrameValidator_onNullMinNumber() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinNumberValue(null);
    dto.setMaxNumberValue(Integer.MAX_VALUE);
    
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts null max number")
  void testCreateConstraintDateFrameValidator_onNullMaxNumber() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinNumberValue(Integer.MIN_VALUE);
    dto.setMinDateValue(null);
    
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts valid number")
  void testCreateConstraintDateFrameValidator_onValidNumbers() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinNumberValue(0);
    dto.setMaxNumberValue(dto.getMinNumberValue() + 1);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts equal numbers")
  void testCreateConstraintDateFrameValidator_onEqualDates() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinNumberValue(0);
    dto.setMaxNumberValue(dto.getMinNumberValue());

    Assertions.assertFalse(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts inverse dates")
  void testCreateConstraintDateFrameValidator_onInverseRange() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinNumberValue(0);
    dto.setMaxNumberValue(dto.getMinNumberValue() - 1);

    Assertions.assertFalse(validateOn(dto));
  }
}
