package ru.relex.aim.service.validation.validator.model;

import ru.relex.aim.commons.EntityType;
import ru.relex.aim.service.validation.annotation.EntityExists;

/**
 * Special model that used to extract entity exists annotation from fields
 */
public final class EntityExistsValidatorTestModel {

  private EntityExistsValidatorTestModel() {
  }

  @EntityExists(entityType = EntityType.EMPLOYEE)
  public static final Integer EMPLOYEE = 0;

  @EntityExists(entityType = EntityType.POST)
  public static final Integer POST = 0;

  @EntityExists(entityType = EntityType.PROJECT)
  public static final Integer PROJECT = 0;

  @EntityExists(entityType = EntityType.PROJECT_STATUS)
  public static final Integer PROJECT_STATUS = 0;

  @EntityExists(entityType = EntityType.REQUEST)
  public static final Integer REQUEST = 0;

  @EntityExists(entityType = EntityType.REQUEST_STATUS)
  public static final Integer REQUEST_STATUS = 0;

  @EntityExists(entityType = EntityType.RESOURCE_POOL)
  public static final Integer RESOURCE_POOL = 0;

  @EntityExists(entityType = EntityType.RESOURCE_TYPE)
  public static final Integer RESOURCE_TYPE = 0;

  @EntityExists(entityType = EntityType.ROLE)
  public static final Integer ROLE = 0;

  @EntityExists(entityType = EntityType.PARAMETER)
  public static final Integer PARAMETER = 0;

  @EntityExists(entityType = EntityType.POOL_PARAMETER_VALUE)
  public static final Integer POOL_PARAMETER_VALUE = 0;

  @EntityExists(entityType = EntityType.CATEGORY_PICTURE)
  public static final Integer CATEGORY_PICTURE = 0;

  @EntityExists(entityType = EntityType.PARAMETER_CONSTRAINT)
  public static final Integer PARAMETER_CONSTRAINT = 0;

  @EntityExists(entityType = EntityType.LIST_VALUE)
  public static final Integer LIST_VALUE = 0;

  @EntityExists(entityType = EntityType.REQUEST_PARAMETER_VALUE)
  public static final Integer REQUEST_PARAMETER_VALUE = 0;
}
