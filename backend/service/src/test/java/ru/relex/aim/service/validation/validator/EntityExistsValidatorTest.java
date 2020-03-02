package ru.relex.aim.service.validation.validator;

import java.util.List;
import javax.validation.ConstraintValidator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.Mockito;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.repository.CategoryPictureRepository;
import ru.relex.aim.repository.repository.EmployeeRepository;
import ru.relex.aim.repository.repository.ListValueRepository;
import ru.relex.aim.repository.repository.ParameterConstraintRepository;
import ru.relex.aim.repository.repository.ParameterRepository;
import ru.relex.aim.repository.repository.ParameterValueRepository;
import ru.relex.aim.repository.repository.PoolParameterValueRepository;
import ru.relex.aim.repository.repository.RequestRepository;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.repository.repository.ResourceTypeRepository;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;
import ru.relex.aim.service.validation.annotation.EntityExists;
import ru.relex.aim.service.validation.validator.model.EntityExistsValidatorTestModel;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EntityExistsValidatorTest extends BaseValidatorTest<EntityExists, Integer> {

  @Override
  protected ConstraintValidator<EntityExists, Integer> createValidator() {
    return new EntityExistsValidator(List.of(
        mock(EmployeeRepository.class),
        mock(ResourcePoolRepository.class),
        mock(ResourceTypeRepository.class),
        mock(RequestRepository.class),
        mock(ParameterRepository.class),
        mock(PoolParameterValueRepository.class),
        mock(CategoryPictureRepository.class),
        mock(ListValueRepository.class),
        mock(ParameterConstraintRepository.class),
        mock(ParameterValueRepository.class)
    ));
  }

  @Override
  protected Class<EntityExists> annotation() {
    return EntityExists.class;
  }

  private static <T extends EntityTypedRepository<?, Integer>> T mock(Class<T> clazz) {
    var mock = Mockito.mock(clazz);
    Mockito.when(mock.getEntityType()).thenCallRealMethod();
    Mockito.when(mock.existsById(Mockito.anyInt())).thenReturn(false);
    Mockito.when(mock.existsById(null)).thenThrow(IllegalArgumentException.class);
    Mockito.when(mock.existsById(1)).thenReturn(true);
    return mock;
  }

  private EntityExists getAnnotationOfType(EntityType et) {
    return fieldAnnotation(EntityExistsValidatorTestModel.class, et.name());
  }

  @ParameterizedTest(name = "Check that EntityExistsValidator not yet implemented for [{0}]")
  @EnumSource(value = EntityType.class, names = {"ALLOCATION_TYPE", "EMPLOYEE", "RESOURCE_POOL",
      "RESOURCE_TYPE", "REQUEST", "PARAMETER", "POOL_PARAMETER_VALUE", "CATEGORY_PICTURE",
      "LIST_VALUE", "PARAMETER_CONSTRAINT", "REQUEST_PARAMETER_VALUE"}, mode = EnumSource.Mode.EXCLUDE)
  void testNotYetImplemented(EntityType et) {
    EntityExists annotation = getAnnotationOfType(et);
    Assertions.assertThrows(UnsupportedOperationException.class, () -> initValidator(annotation));
  }

  @ParameterizedTest(name = "Check that EntityExistsValidator for [{0}] correctly processes null")
  @EnumSource(value = EntityType.class, names = {"EMPLOYEE", "RESOURCE_POOL",
      "RESOURCE_TYPE", "REQUEST", "PARAMETER", "POOL_PARAMETER_VALUE", "CATEGORY_PICTURE",
      "LIST_VALUE", "PARAMETER_CONSTRAINT", "REQUEST_PARAMETER_VALUE"}, mode = EnumSource.Mode.INCLUDE)
  void testOnNull(EntityType et) {
    EntityExists annotation = getAnnotationOfType(et);
    initValidator(annotation);
    Assertions.assertTrue(validateOn(null));
  }

  @ParameterizedTest(name = "Check that EntityExistsValidator for [{0}] correctly processes finds object")
  @EnumSource(value = EntityType.class, names = {"EMPLOYEE", "RESOURCE_POOL",
      "RESOURCE_TYPE", "REQUEST", "PARAMETER", "POOL_PARAMETER_VALUE", "CATEGORY_PICTURE",
      "LIST_VALUE", "PARAMETER_CONSTRAINT", "REQUEST_PARAMETER_VALUE"}, mode = EnumSource.Mode.INCLUDE)
  void testOnExisting(EntityType et) {
    EntityExists annotation = getAnnotationOfType(et);
    initValidator(annotation);
    Assertions.assertTrue(validateOn(1));
  }

  @ParameterizedTest(name = "Check that EntityExistsValidator for [{0}] correctly processes finds object")
  @EnumSource(value = EntityType.class, names = {"EMPLOYEE", "RESOURCE_POOL",
      "RESOURCE_TYPE", "REQUEST", "PARAMETER", "POOL_PARAMETER_VALUE", "CATEGORY_PICTURE",
      "LIST_VALUE", "PARAMETER_CONSTRAINT", "REQUEST_PARAMETER_VALUE"}, mode = EnumSource.Mode.INCLUDE)
  void testOnNonExisting(EntityType et) {
    EntityExists annotation = getAnnotationOfType(et);
    initValidator(annotation);
    Assertions.assertFalse(validateOn(2));
  }

}
