package ru.relex.aim.service.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.ResourcePool;
import ru.relex.aim.service.model.create.ResourcePoolCreateDto;
import ru.relex.aim.service.model.get.ResourcePoolFullGetDto;
import ru.relex.aim.service.model.get.ResourcePoolGetDto;
import ru.relex.aim.service.model.update.ResourcePoolUpdateDto;

import java.util.List;

/**
 * Maps between {@link ResourcePool} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper(uses = {
    AllocationTypeMapper.class,
    IEmployeeMapper.class,
    IPoolParameterValueMapper.class,
    IParamValueShortVerMapper.class,
    IResourceTypeMapper.class,
    }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IResourcePoolMapper {

  /**
   * Converts {@link ResourcePool} to {@link ResourcePoolGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "requestsAmount", ignore = true)
  ResourcePoolGetDto toGetDto(ResourcePool entity);

  /**
   * Converts a list of {@link ResourcePool} to a list {@link ResourcePoolGetDto}.
   *
   * @param entities entities to convert
   */
  List<ResourcePoolGetDto> toGetDto(List<ResourcePool> entities);

  /**
   * Converts {@link ResourcePoolCreateDto} to a list {@link ResourcePool}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "resourceType.id", source = "resourceTypeId")
  @Mapping(target = "currentCapacity", ignore = true)
  ResourcePool fromCreateDto(ResourcePoolCreateDto dto);

  /**
   * Converts {@link ResourcePoolUpdateDto} to a list {@link ResourcePool}.
   *
   * @param updateDto entity to convert
   */
  @Mapping(target = "resourceType.id", source = "resourceTypeId")
  @Mapping(target = "currentCapacity", ignore = true)
  ResourcePool fromUpdateDto(ResourcePoolUpdateDto updateDto);

  /**
   * Converts {@link ResourcePool} to {@link ResourcePoolFullGetDto}.
   *
   * @param entity entity to convert
   */
  ResourcePoolFullGetDto toFullGetDto(ResourcePool entity);
}
