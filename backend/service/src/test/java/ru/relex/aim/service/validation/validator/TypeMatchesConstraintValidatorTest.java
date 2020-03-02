package ru.relex.aim.service.validation.validator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.EnumSource.Mode;
import org.junit.jupiter.params.provider.NullSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import ru.relex.aim.repository.repository.ResourceTypeRepository;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.model.base.ParameterTypeDto;
import ru.relex.aim.service.model.create.ListValueCreateDto;
import ru.relex.aim.service.model.create.ParameterConstraintCreateDto;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.validation.annotation.ConstraintMatchesType;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TypeMatchesConstraintValidatorTest extends
    BaseValidatorTest<ConstraintMatchesType, AbstractParameterDto> {

  @Override
  protected ConstraintValidator<ConstraintMatchesType, AbstractParameterDto> createValidator() {
    var annotation = AbstractParameterDto.class.getAnnotation(ConstraintMatchesType.class);
    var repository = Mockito.mock(ResourceTypeRepository.class);
    Mockito.when(repository.existsById(Mockito.anyInt())).thenReturn(true);
    var validator = new TypeMatchesConstraintValidator(repository);
    validator.initialize(annotation);
    return validator;
  }

  @Override
  protected Class<ConstraintMatchesType> annotation() {
    return ConstraintMatchesType.class;
  }

  @Test
  @DisplayName("Check that validator accepts nulls correctly")
  void testCreateTypeMatchesConstraintValidator_onNulls() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts null parameter type")
  void testCreateTypeMatchesConstraintValidator_onNullParameterType() {
    var dto = new ParameterCreateDto();
    dto.setParameterType(null);
    dto.setConstraint(new ParameterConstraintCreateDto());
    Assertions.assertTrue(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts null constraint")
  void testCreateTypeMatchesConstraintValidator_onNullConstraint() {
    var dto = new ParameterCreateDto();
    dto.setParameterType(ParameterTypeDto.NUMBER);
    dto.setConstraint(null);
    Assertions.assertTrue(validateOn(dto));
  }

  @ParameterizedTest(name = "Check that validator for [{0}] type accepts valid constraint")
  @EnumSource(ParameterTypeDto.class)
  void testCreateTypeMatchesConstraintValidator_onValidConstraint(ParameterTypeDto parameterType) {
    var dto = new ParameterCreateDto();

    dto.setParameterType(parameterType);
    dto.setPoolTypeId(1);
    dto.setConstraint(getValidConstraint());

    Assertions.assertTrue(validateOn(dto));
  }

  @ParameterizedTest(name = "Check that validator for [{0}] type accepts invalid constraint")
  @EnumSource(ParameterTypeDto.class)
  void testCreateTypeMatchesConstraintValidator_onInvalidConstraint(ParameterTypeDto parameterType) {
    var dto = new ParameterCreateDto();
    dto.setPoolTypeId(1);
    dto.setParameterType(parameterType);
    dto.setConstraint(getInvalidConstraint());

    Assertions.assertTrue(validateOn(dto));
  }

  @ParameterizedTest(name = "Check that validator for [{0}] type accepts constraint with null min value")
  @EnumSource(value = ParameterTypeDto.class, names = {"TEXT", "LIST"}, mode = Mode.EXCLUDE)
  void testCreateTypeMatchesConstraintValidator_onMinNullConstraint(ParameterTypeDto parameterType) {
    var dto = new ParameterCreateDto();
    dto.setPoolTypeId(1);
    dto.setParameterType(parameterType);
    dto.setConstraint(getMinNullConstraint());

    Assertions.assertTrue(validateOn(dto));
  }

  @ParameterizedTest(name = "Check that validator for [{0}] type accepts constraint with null max value")
  @EnumSource(value = ParameterTypeDto.class, names = {"LIST"}, mode = Mode.EXCLUDE)
  void testCreateTypeMatchesConstraintValidator_onMaxNullConstraint(ParameterTypeDto parameterType) {
    var dto = new ParameterCreateDto();
    dto.setPoolTypeId(1);
    dto.setParameterType(parameterType);
    dto.setConstraint(getMaxNullConstraint());

    Assertions.assertTrue(validateOn(dto));
  }

  @ParameterizedTest(name = "Check that validator for LIST type accepts constraint with [{0}] list values")
  @NullSource
  @EmptySource
  void testCreateTypeMatchesConstraintValidator_onListNullOrEmptyConstraint(List<ListValueCreateDto> listValues) {
    var dto = new ParameterCreateDto();

    var constraint = new ParameterConstraintCreateDto();
    constraint.setListValues(listValues);

    dto.setParameterType(ParameterTypeDto.LIST);
    dto.setConstraint(constraint);

    Assertions.assertFalse(validateOn(dto));
  }


  //region Constraint factory methods
  private ParameterConstraintCreateDto getValidConstraint() {
    var constraint = new ParameterConstraintCreateDto();
    var listValues = getListValues("One", "Two", "Three");

    constraint.setMinNumberValue(0);
    constraint.setMaxNumberValue(constraint.getMinNumberValue() + 1);
    constraint.setMinDateValue(LocalDate.now());
    constraint.setMaxDateValue(constraint.getMinDateValue().plusDays(1));
    constraint.setMaxStringLength(10);
    constraint.setListValues(listValues);

    return constraint;
  }

  private ParameterConstraintCreateDto getInvalidConstraint() {
    var constraint = new ParameterConstraintCreateDto();
    var listValues = getListValues("One", "One", "Three");

    constraint.setMinNumberValue(0);
    constraint.setMaxNumberValue(constraint.getMinNumberValue() - 1);
    constraint.setMinDateValue(LocalDate.now());
    constraint.setMaxDateValue(constraint.getMinDateValue().minusDays(1));
    constraint.setMaxStringLength(-1);
    constraint.setListValues(listValues);

    return constraint;
  }

  private ParameterConstraintCreateDto getMinNullConstraint() {
    var constraint = new ParameterConstraintCreateDto();

    constraint.setMinNumberValue(null);
    constraint.setMaxNumberValue(Integer.MAX_VALUE);
    constraint.setMinDateValue(null);
    constraint.setMaxDateValue(LocalDate.MAX);

    return constraint;
  }

  private ParameterConstraintCreateDto getMaxNullConstraint() {
    var constraint = new ParameterConstraintCreateDto();

    constraint.setMinNumberValue(Integer.MIN_VALUE);
    constraint.setMaxNumberValue(null);
    constraint.setMinDateValue(LocalDate.MIN);
    constraint.setMaxDateValue(null);
    constraint.setMaxStringLength(null);

    return constraint;
  }

  //endregion

  private List<ListValueCreateDto> getListValues(String... contents) {
    var listValues = new ArrayList<ListValueCreateDto>();
    for (var content : contents) {
      var listValue = new ListValueCreateDto();
      listValue.setContent(content);
      listValues.add(listValue);
    }
    return listValues;
  }
}
