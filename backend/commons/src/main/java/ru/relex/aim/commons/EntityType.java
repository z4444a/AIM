package ru.relex.aim.commons;

/**
 * Enum for describing all existing entities in the application.
 *
 * @author Alexey Alimov
 */
public enum EntityType {
  CATEGORY_PICTURE("CategoryPicture"),
  PARAMETER_CONSTRAINT("ParameterConstraint"),
  ALLOCATION_TYPE("AllocationType"),
  EMPLOYEE("Employee"),
  POST("Post"),
  PROJECT("Project"),
  PROJECT_STATUS("ProjectStatus"),
  REQUEST("Request"),
  REQUEST_STATUS("RequestStatus"),
  RESOURCE_POOL("ResourcePool"),
  RESOURCE_TYPE("ResourceType"),
  ROLE("Role"),
  PARAMETER("Parameter"),
  LIST_VALUE("ValueList"),
  POOL_PARAMETER_VALUE("PoolParameterValue"),
  REQUEST_PARAMETER_VALUE("RequestParameterValue");

  private final String entityName;

  EntityType(String entityName) {
    this.entityName = entityName;
  }

  public String getEntityName() {
    return entityName;
  }
}
