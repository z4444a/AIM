package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.AllocationType;

/**
 * Maps between {@link AllocationType} and it's DTOs.
 *
 * @author Sorokin Georgy
 */
@Mapper
public class AllocationTypeMapper {
  /**
   * Casts from DTO integer field to enum.
   *
   * @param allocationTypeId DTO integer field
   * @return enum value
   */
  public AllocationType toModifierEnum(Integer allocationTypeId) {
    return AllocationType.fromId(allocationTypeId);
  }

  /**
   * Converts from enum value to integer field.
   *
   * @param allocationType enum value
   * @return DTO integer field
   */
  public Integer fromModifierEnum(AllocationType allocationType) {
    return allocationType.getId();
  }
}
