package ru.relex.aim.repository.repository.base;

import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.Serializable;

/**
 * Default implementation of {@link BaseRepository}.
 *
 * @param <T> Entity type
 * @param <I> Entity id type
 * @author Alexey Alimov
 */
public class BaseRepositoryImpl<T, I extends Serializable>
    extends SimpleJpaRepository<T, I> implements BaseRepository<T, I> {

  private final EntityManager entityManager;

  /**
   * Creates a new {@link BaseRepositoryImpl}.
   *
   * @param entityInformation must not be {@literal null}.
   * @param entityManager must not be {@literal null}.
   * @author Alexey Alimov
   */
  public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);
    this.entityManager = entityManager;
  }

  /**
   * Refreshes the given entity.
   *
   * @param entity Entity to refresh
   * @author Alexey Alimov
   */
  @Override
  @Transactional
  public void refresh(T entity) {
    entityManager.refresh(entity);
  }

  /**
   * Saves and then refreshes given entity.
   * Use it if entity has nested objects and you need information about them.
   *
   * @param entity Entity to save
   * @return Saved Entity
   * @author Alexy Alimov
   */
  @Override
  @Transactional
  public T saveAndRefresh(T entity) {
    final T updated = super.save(entity);
    entityManager.flush();
    entityManager.refresh(updated);
    return updated;
  }
}
