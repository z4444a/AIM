package ru.relex.aim.repository.repository.base;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * Base repository interface.
 * Extends {@link JpaRepository} and adds two new methods to it.
 *
 * @param <T> Entity type
 * @param <I> Entity id type
 */
@NoRepositoryBean
public interface BaseRepository<T, I extends Serializable>
    extends JpaRepository<T, I>, JpaSpecificationExecutor<T> {

  /**
   * Refreshes the given entity.
   *
   * @param entity Entity to refresh
   * @author Alexey Alimov
   */
  void refresh(T entity);

  /**
   * Saves and then refreshes given entity.
   * Use it if entity has nested objects and you need information about them.
   *
   * @param entity Entity to save
   * @return Saved Entity
   * @author Alexy Alimov
   */
  T saveAndRefresh(T entity);
}
