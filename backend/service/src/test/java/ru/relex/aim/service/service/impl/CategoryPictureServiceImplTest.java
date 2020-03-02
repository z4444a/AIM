package ru.relex.aim.service.service.impl;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.relex.aim.repository.entity.CategoryPicture;
import ru.relex.aim.repository.repository.CategoryPictureRepository;
import ru.relex.aim.service.MapperTestConfiguration;
import ru.relex.aim.service.mapper.ICategoryPictureMapper;
import ru.relex.aim.service.model.create.CategoryPictureCreateDto;
import ru.relex.aim.service.service.ICategoryPictureService;

import java.util.Optional;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MapperTestConfiguration.class)
class CategoryPictureServiceImplTest {
  private CategoryPicture categoryPicture;
  private CategoryPictureCreateDto pictureCreateDto;
  private ICategoryPictureService categoryPictureService;
  private final ICategoryPictureMapper mapper;

  @Autowired
  CategoryPictureServiceImplTest(ICategoryPictureMapper mapper) {
    this.mapper = mapper;
    final var categoryPicture = new CategoryPicture();
    categoryPicture.setId(0);
    categoryPicture.setPicture(new byte[0]);
    categoryPicture.setPicturePath(null);
    final var pictureCreateDto = new CategoryPictureCreateDto();
    pictureCreateDto.setPicture(new byte[0]);
    pictureCreateDto.setPicturePath(null);
    this.pictureCreateDto = pictureCreateDto;
    this.categoryPicture = categoryPicture;
  }

  @BeforeAll
  void setUp() {
    var pictureRepository = Mockito.mock(CategoryPictureRepository.class);
    Mockito.when(pictureRepository.findById(Mockito.anyInt())).thenReturn(Optional.empty());
    Mockito.when(pictureRepository.findById(categoryPicture.getId())).thenReturn(Optional.of(categoryPicture));
    Mockito.when(pictureRepository.saveAndRefresh(mapper.fromCreateDto(pictureCreateDto))).thenReturn(categoryPicture);
    categoryPictureService = new CategoryPictureServiceImpl(pictureRepository, mapper);
  }

  @Test
  @DisplayName("Check that picture is fetched correctly")
  void get() {
    Assertions.assertEquals(mapper.toGetDto(categoryPicture), categoryPictureService.get(categoryPicture.getId()));
  }

  @Test
  @DisplayName("Check that picture is saved correctly")
  void createIcon() {
    Assertions.assertEquals(mapper.toGetDto(categoryPicture), categoryPictureService.createIcon(pictureCreateDto));
  }
}
