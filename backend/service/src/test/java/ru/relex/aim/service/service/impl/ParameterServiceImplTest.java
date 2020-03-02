package ru.relex.aim.service.service.impl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.relex.aim.commons.modifier.ParameterModifier;
import ru.relex.aim.repository.entity.Parameter;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.service.service.IParameterService;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
public class ParameterServiceImplTest {

  private final String identifier = "o_0";
  private IParameterService parameterService;

  @BeforeAll
  void setUp() {
    Parameter parameter = new Parameter();
    parameter.setId(0);
    parameter.setModifier(ParameterModifier.REQUEST_PARAMETER);
    parameter.setIdentifier(identifier);

    ParameterRepository parameterRepository = Mockito.mock(ParameterRepository.class);
    Mockito.when(parameterRepository.findByIdentifierAndModifier(Mockito.anyString(), Mockito.any(ParameterModifier.class))).thenReturn(null);
    Mockito.when(parameterRepository.findByIdentifierAndModifier(parameter.getIdentifier(), parameter.getModifier())).thenReturn(parameter);

    parameterService = new ParameterServiceImpl(parameterRepository, null, null, null);
  }

  @Test
  public void testIsUsedMethod() {
    Assertions.assertAll(
        () -> Assertions.assertTrue(parameterService.isIdentifierUsed(identifier, ParameterModifier.REQUEST_PARAMETER, 1)),
        () -> Assertions.assertFalse(parameterService.isIdentifierUsed("-", ParameterModifier.REQUEST_PARAMETER, 0)),
        () -> Assertions.assertFalse(parameterService.isIdentifierUsed(identifier, ParameterModifier.REQUEST_PARAMETER, 0))
    );
  }
}
