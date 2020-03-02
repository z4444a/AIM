package ru.relex.aim.service.validation.validator;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import ru.relex.aim.commons.EntityType;
import ru.relex.aim.repository.repository.base.EntityTypedRepository;
import ru.relex.aim.service.validation.annotation.EntityExists;

/**
 * Class for checking whether or not entity with a given ID exists.
 *
 * @author Alexey Alimov
 */
public class EntityExistsValidator implements ConstraintValidator<EntityExists, Integer> {

  private final Map<EntityType, ? extends EntityTypedRepository<?, Integer>> repositories;

  private CrudRepository repository;

  /**
   * Constructor.
   */
  public EntityExistsValidator(@Autowired List<? extends EntityTypedRepository<?, Integer>> repositories) {
    this.repositories = repositories
                            .stream()
                            .collect(Collectors.toMap(r -> r.getEntityType(), r -> r));
  }

  @Override
  public void initialize(EntityExists annotation) {
    final EntityType entityType = annotation.entityType();
    repository = repositories.get(entityType);
    if (repository == null) {
      throw new UnsupportedOperationException("Checking existence of " + entityType.getEntityName()
                                                  + " is not supported");
    }
  }

  @Override
  public boolean isValid(Integer value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    return repository.existsById(value);
  }
}
