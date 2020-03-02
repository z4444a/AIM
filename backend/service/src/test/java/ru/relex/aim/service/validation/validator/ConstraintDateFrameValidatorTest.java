package ru.relex.aim.service.validation.validator;

import java.time.LocalDate;
import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.model.base.AbstractParameterConstraintDto;
import ru.relex.aim.service.model.base.AbstractRequestDto;
import ru.relex.aim.service.model.create.ParameterConstraintCreateDto;
import ru.relex.aim.service.validation.annotation.DateFrame;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ConstraintDateFrameValidatorTest extends BaseValidatorTest<DateFrame, AbstractParameterConstraintDto> {

  @Override
  protected ConstraintValidator<DateFrame, AbstractParameterConstraintDto> createValidator() {
    var annotation = AbstractRequestDto.class.getAnnotation(DateFrame.class);
    var validator = new ConstraintDateFrameValidator();
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<DateFrame> annotation() {
    return DateFrame.class;
  }

  @Test
  @DisplayName("Check that validator accepts nulls correctly")
  void testCreateConstraintDateFrameValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts null min date")
  void testCreateConstraintDateFrameValidator_onNullMinDate() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinDateValue(null);
    dto.setMaxDateValue(LocalDate.MAX);
    
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts null max date")
  void testCreateConstraintDateFrameValidator_onNullMaxDate() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinDateValue(LocalDate.MIN);
    dto.setMaxDateValue(null);
    
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts valid dates")
  void testCreateConstraintDateFrameValidator_onValidRange() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinDateValue(LocalDate.now());
    dto.setMaxDateValue(dto.getMinDateValue().plusDays(1));

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts equal dates")
  void testCreateConstraintDateFrameValidator_onEqualDates() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinDateValue(LocalDate.now());
    dto.setMaxDateValue(dto.getMinDateValue());

    Assertions.assertFalse(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts inverse dates")
  void testCreateConstraintDateFrameValidator_onInverseRange() {
    var dto = new ParameterConstraintCreateDto();
    dto.setMinDateValue(LocalDate.now());
    dto.setMaxDateValue(dto.getMinDateValue().minusDays(1));

    Assertions.assertFalse(validateOn(dto));
  }
}
