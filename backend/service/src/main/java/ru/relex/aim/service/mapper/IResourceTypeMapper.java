package ru.relex.aim.service.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.relex.aim.repository.entity.ResourceType;
import ru.relex.aim.service.mapper.qualifier.TypeGetDtoQualifier;
import ru.relex.aim.service.mapper.qualifier.TypeRowQualifier;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.create.ResourceTypeCreateDto;
import ru.relex.aim.service.model.get.ResourceTypeGetDto;

import java.util.List;

import ru.relex.aim.service.model.get.ResourceTypeRowGetDto;
import ru.relex.aim.service.model.update.ResourceTypeUpdateDto;

/**
 * Maps between {@link ResourceType} and it's DTOs.
 *
 * @author Alexey Alimov
 */
@Mapper(uses = {
    ICategoryPictureMapper.class,
    IParameterMapper.class
    }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IResourceTypeMapper {

  /**
   * Converts {@link ResourceType} to {@link NamedDto}.
   */
  NamedDto toNamedDto(ResourceType entity);

  /**
   * Converts {@link ResourceType} to {@link ResourceTypeRowGetDto}.
   *
   * @param entity entity to convert
   */
  @TypeRowQualifier
  @Mapping(target = "numberOfPools", ignore = true)
  @Mapping(target = "numberOfRequests", ignore = true)
  ResourceTypeRowGetDto toRowDto(ResourceType entity);

  /**
   * Converts a list of {@link ResourceType} to a list of {@link ResourceTypeRowGetDto}.
   *
   * @param entities entities to convert
   */
  @IterableMapping(qualifiedBy = TypeRowQualifier.class)
  List<ResourceTypeRowGetDto> toRowDto(List<ResourceType> entities);

  /**
   * Converts {@link ResourceType} to {@link ResourceTypeGetDto}.
   *
   * @param entity entity to convert
   */
  @TypeGetDtoQualifier
  ResourceTypeGetDto toGetDto(ResourceType entity);

  /**
   * Converts a list of {@link ResourceType} to a list of {@link ResourceTypeGetDto}.
   *
   * @param entities entities to convert
   */
  @IterableMapping(qualifiedBy = TypeGetDtoQualifier.class)
  List<ResourceTypeGetDto> toGetDto(List<ResourceType> entities);

  /**
   * Connverts a list of {@link ResourceTypeGetDto} to a list {@link NamedDto}.
   *
   * @param entities entities to convert
   */
  List<NamedDto> toGetActiveDto(List<ResourceType> entities);

  /**
   * Converts {@link ResourceTypeCreateDto} to {@link ResourceTypeCreateDto}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  ResourceType fromCreateDto(ResourceTypeCreateDto dto);

  /**
   * Converts {@link ResourceTypeUpdateDto} to {@link ResourceType}.
   *
   * @param dto entity to convert
   */
  ResourceType fromUpdateDto(ResourceTypeUpdateDto dto);
}
