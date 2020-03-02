package ru.relex.aim.service.mapper;

import org.mapstruct.Mapper;
import ru.relex.aim.repository.entity.NamedEntity;
import ru.relex.aim.service.model.base.NamedDto;
import ru.relex.aim.service.model.get.NamedTypedDto;

import java.util.List;

/**
 * Maps between {@link NamedEntity} and {@link NamedDto}.
 */
@Mapper
public interface INamedEntityMapper {
  /**
   * Converts a list of {@link NamedEntity} to a list {@link NamedDto}.
   */
  List<NamedDto> toNamedDto(List<NamedEntity> entities);

  /**
   * Converts {@link NamedEntity} to {@link NamedTypedDto} using {@param typeId}.
   */
  NamedTypedDto toNamedTypedDto(NamedEntity entity, Integer typeId);

}
