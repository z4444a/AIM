package ru.relex.aim.service.validation.validator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.model.base.AbstractRequestDto;
import ru.relex.aim.service.model.create.RequestCreateDto;
import ru.relex.aim.service.validation.annotation.DateFrame;

import javax.validation.ConstraintValidator;
import java.time.LocalDate;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class RequestUsageDateFrameValidatorTest extends BaseValidatorTest<DateFrame, AbstractRequestDto> {

  @Override
  protected ConstraintValidator<DateFrame, AbstractRequestDto> createValidator() {
    var annotation = AbstractRequestDto.class.getAnnotation(DateFrame.class);
    var validator = new RequestUsageDateFrameValidator();
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<DateFrame> annotation() {
    return DateFrame.class;
  }

  @Test
  @DisplayName("Check that Validator accepts nulls correctly")
  void testCreateUsageDateFrameValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that Validator accepts null start date")
  void testCreateUsageDateFrameValidator_noStartDate() {
    var dto = new RequestCreateDto();
    dto.setUsageStart(null);
    dto.setUsageFinish(LocalDate.MAX);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts null end date")
  void testCreateUsageDateFrameValidator_noEndDate() {
    var dto = new RequestCreateDto();
    dto.setUsageStart(LocalDate.MIN);
    dto.setUsageFinish(null);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that Validator accepts valid dates")
  void testCreateUsageDateFrameValidator_validRange() {
    var dto = new RequestCreateDto();
    dto.setUsageStart(LocalDate.now());
    dto.setUsageFinish(dto.getUsageStart().plusDays(1));

    Assertions.assertTrue(validateOn(dto));
  }


  @Test
  @DisplayName("Check that Validator accepts equal dates")
  void testCreateUsageDateFrameValidator_equalRange() {
    var dto = new RequestCreateDto();
    dto.setUsageStart(LocalDate.now());
    dto.setUsageFinish(dto.getUsageStart());

    Assertions.assertFalse(validateOn(dto));
  }


  @Test
  @DisplayName("Check that Validator accepts inversed dates")
  void testCreateUsageDateFrameValidator_inversed() {
    var dto = new RequestCreateDto();
    dto.setUsageStart(LocalDate.now());
    dto.setUsageFinish(dto.getUsageStart().minusDays(1));
    Assertions.assertFalse(validateOn(dto));
  }
}
