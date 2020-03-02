package ru.relex.aim.service.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import ru.relex.aim.repository.repository.CategoryPictureRepository;
import ru.relex.aim.service.mapper.ICategoryPictureMapper;
import ru.relex.aim.service.model.create.CategoryPictureCreateDto;
import ru.relex.aim.service.model.get.CategoryPictureGetDto;
import ru.relex.aim.service.service.ICategoryPictureService;

import javax.validation.constraints.NotNull;

/**
 * Manages {@link ru.relex.aim.repository.entity.CategoryPicture}.
 *
 * @author Dmitriy Poshevelya
 */
@Validated
@Service
@Transactional
public class CategoryPictureServiceImpl implements ICategoryPictureService {
  private final CategoryPictureRepository repository;
  private final ICategoryPictureMapper mapper;

  /**
   * Constructor.
   */
  public CategoryPictureServiceImpl(CategoryPictureRepository repository, ICategoryPictureMapper mapper) {
    this.repository = repository;
    this.mapper = mapper;
  }

  @Override
  public CategoryPictureGetDto get(@NotNull Integer id) {
    return repository
        .findById(id)
        .map(mapper::toGetDto)
        .orElse(null);
  }

  @Override
  @Transactional
  public CategoryPictureGetDto createIcon(CategoryPictureCreateDto categoryPicture) {
    return mapper.toGetDto(repository.saveAndRefresh(
        mapper.fromCreateDto(categoryPicture)
    ));
  }
}
