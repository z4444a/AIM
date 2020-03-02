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
import ru.relex.aim.repository.entity.NamedEntity;
import ru.relex.aim.repository.repository.ResourcePoolRepository;
import ru.relex.aim.service.MapperTestConfiguration;
import ru.relex.aim.service.mapper.INamedEntityMapper;

import java.util.List;

/**
 * Tests {@link ResourcePoolServiceImpl}.
 */
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = MapperTestConfiguration.class)
class ResourcePoolServiceImplTest {

  private final INamedEntityMapper namedEntityMapper;
  private ResourcePoolServiceImpl poolService;
  private NamedEntity suggestion;
  private Integer typeId;

  @Autowired
  public ResourcePoolServiceImplTest(INamedEntityMapper namedEntityMapper) {
    this.namedEntityMapper = namedEntityMapper;
  }

  @BeforeAll
  void setUp() {
    typeId = 1;
    suggestion = new NamedEntity() {
      @Override
      public Integer getId() {
        return 1;
      }

      @Override
      public String getName() {
        return "NAME";
      }
    };
    var poolRepository = Mockito.mock(ResourcePoolRepository.class);
    Mockito.when(poolRepository.getSuggestions(
        Mockito.eq(typeId),
        Mockito.eq(false),
        Mockito.anyInt(),
        Mockito.eq(false),
        Mockito.anyInt())).thenReturn(List.of(suggestion));
    poolService = new ResourcePoolServiceImpl(poolRepository, null, null, null,
        null, null, null, namedEntityMapper);
  }

  @Test
  @DisplayName("Check that suggestions fetch correctly")
  void getTypedSuggestions() {
    Assertions.assertEquals(List.of(namedEntityMapper.toNamedTypedDto(suggestion, typeId)),
        poolService.getTypedSuggestions(typeId));
  }
}
