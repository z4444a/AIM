package ru.relex.aim.service.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ru.relex.aim.repository.entity.PoolParameterValue;
import ru.relex.aim.service.model.create.PoolParameterValueCreateDto;
import ru.relex.aim.service.model.get.PoolParameterValueGetDto;
import ru.relex.aim.service.model.update.PoolParameterValueUpdateDto;

import java.util.List;

/**
 * Maps between {@link PoolParameterValue} and it's DTOs.
 *
 * @author Nastya Zinchenko
 */
@Mapper(uses = {
    IValueMapper.class,
    IEmployeeMapper.class,
    AllocationTypeMapper.class,
    IParamValueShortVerMapper.class,
    INamedEntityMapper.class
    }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IPoolParameterValueMapper {

  /**
   * Converts {@link PoolParameterValue} to {@link PoolParameterValueGetDto}.
   *
   * @param entity entity to convert
   */
  @Mapping(target = "parameterId", source = "parameter.id")
  PoolParameterValueGetDto toGetDto(PoolParameterValue entity);

  /**
   * Converts a list of {@link PoolParameterValue}
   * to a list of {@link PoolParameterValueGetDto}.
   *
   * @param entities entities to convert
   */
  List<PoolParameterValueGetDto> toGetDto(List<PoolParameterValue> entities);

  /**
   * Converts {@link PoolParameterValueCreateDto} to {@link PoolParameterValue}.
   *
   * @param dto entity to convert
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "parameter.id", source = "parameterId")
  @Mapping(target = "pool.id", source = "poolId")
  @Mapping(target = "parameterPool.id", source = "parameterPoolId")
  PoolParameterValue fromCreateDto(PoolParameterValueCreateDto dto);

  /**
   * Converts {@link PoolParameterValueUpdateDto} to {@link PoolParameterValue}.
   *
   * @param updateDto entity to convert
   */
  @Mapping(target = "parameter.id", source = "parameterId")
  @Mapping(target = "pool.id", source = "poolId")
  @Mapping(target = "parameterPool.id", source = "parameterPoolId")
  PoolParameterValue fromUpdateDto(PoolParameterValueUpdateDto updateDto);

  /**
   * Sets {@code parameterPool} to null if the given id is null.
   */
  @AfterMapping
  default void setEmptyObjectsToNull(PoolParameterValueUpdateDto updateDto, @MappingTarget PoolParameterValue result) {
    if (updateDto.getParameterPoolId() == null) {
      result.setParameterPool(null);
    }
  }

  /**
   * Sets {@code parameterPool} to null if the given id is null.
   */
  @AfterMapping
  default void setEmptyObjectsToNull(PoolParameterValueCreateDto createDtoDto,
                                     @MappingTarget PoolParameterValue result) {
    if (createDtoDto.getParameterPoolId() == null) {
      result.setParameterPool(null);
    }
  }
}
