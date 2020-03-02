package ru.relex.aim.service.validation.validator;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.Mockito;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.service.model.base.AbstractParameterDto;
import ru.relex.aim.service.model.create.ParameterCreateDto;
import ru.relex.aim.service.model.update.ParameterUpdateDto;
import ru.relex.aim.service.service.IParameterService;
import ru.relex.aim.service.validation.annotation.ParameterIdentifierUnique;

import javax.validation.ConstraintValidator;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ParameterIdentifierUniqueValidatorTest extends BaseValidatorTest<ParameterIdentifierUnique, AbstractParameterDto> {
  private Integer id;

  @Override
  protected ConstraintValidator<ParameterIdentifierUnique, AbstractParameterDto> createValidator() {
    final var mock = Mockito.mock(IParameterService.class);
    Mockito
        .when(mock.isIdentifierUsed(Mockito.anyString(), Mockito.any(ParameterModifier.class), Mockito.anyInt()))
        .thenReturn(false);
    Mockito
        .when(mock.isIdentifierUsed("id", ParameterModifier.REQUEST_PARAMETER, 0))
        .thenReturn(false);
    Mockito
        .when(mock.isIdentifierUsed("id", ParameterModifier.REQUEST_PARAMETER, null))
        .thenReturn(true);
    return new AbstractParameterIdentifierUniqueValidator<>(mock) {
      @Override
      protected Integer getId(AbstractParameterDto dto) {
        return id;
      }
    };
  }

  @Override
  protected Class<ParameterIdentifierUnique> annotation() {
    return ParameterIdentifierUnique.class;
  }

  @Test
  @DisplayName("Check that validator accepts null dto")
  void testParameterIdentifierUniqueValidator_onNullDto() {
    Assertions.assertTrue(validateOn(null));
  }

  @Test
  @DisplayName("Check that validator accepts parameter create dto")
  void testParameterIdentifierUniqueValidator_onParameterCreateDto() {
    final var dto = new ParameterCreateDto();
    id = null;
    dto.setIdentifier("id");
    dto.setModifier(ParameterModifier.REQUEST_PARAMETER);
    Assertions.assertFalse(validateOn(dto));
  }

  @Test
  @DisplayName("Check that validator accepts parameter update dto")
  void testParameterIdentifierUniqueValidator_onParameterUpdateDto() {
    final var dto = new ParameterUpdateDto();
    dto.setIdentifier("id");
    dto.setModifier(ParameterModifier.REQUEST_PARAMETER);
    id = 0;
    dto.setId(id);
    Assertions.assertTrue(validateOn(dto));
  }
}
