package ru.relex.aim.service.validation.validator;

import java.util.ArrayList;
import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import ru.relex.aim.service.model.base.AbstractResourceTypeDto;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.validation.annotation.UniqueNames;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CreateParameterNameValidatorTest extends BaseValidatorTest<UniqueNames, AbstractResourceTypeDto> {

  @Override
  protected ConstraintValidator<UniqueNames, AbstractResourceTypeDto> createValidator() {
    var annotation = AbstractResourceTypeDto.class.getAnnotation(UniqueNames.class);
    var validator = new ParameterNameValidator();
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<UniqueNames> annotation() {
    return UniqueNames.class;
  }

  @Test
  @DisplayName("Check that validator accepts nulls correctly")
  void testCreateParameterNameValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts null parameters")
  void testCreateParameterNameValidator_onNullParams() {
    var dto = new ResourceTypeCreateDto();
    dto.setParameters(null);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts empty parameter list")
  void testCreateParameterNameValidator_onEmptyParams() {
    var dto = getTestCase();

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts parameter list with some names that are null")
  void testCreateParameterNameValidator_onNullNames() {
    var dto = getTestCase(null, "Valid", "Test", null);

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts parameter list with valid names")
  void testCreateParameterNameValidator_onValidParams() {
    var dto = getTestCase("Test one", "Test two", "Test three");

    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts parameter list with some names that are different only by case")
  void testCreateParameterNameValidator_onCaseParams() {
    var dto = getTestCase("Test", "test", "TEST", "Valid");

    Assertions.assertFalse(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts parameter list with some names that are the same")
  void testCreateParameterNameValidator_onSameName() {
    var dto = getTestCase("Test", "Test", "Valid");

    Assertions.assertFalse(validateOn(dto));
  }

  private ResourceTypeCreateDto getTestCase(String... names) {
    var dto = new ResourceTypeCreateDto();
    var params = new ArrayList<ParameterCreateDto>();

    for (var name : names) {
      var param = new ParameterCreateDto();
      param.setName(name);
      params.add(param);
    }

    dto.setParameters(params);

    return dto;
  }
}
