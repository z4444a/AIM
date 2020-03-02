package ru.relex.aim.repository.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.relex.aim.repository.entity.Master;

/**
 * Extends {@link CrudRepository} and allows
 * to work with first user {@link Master}.
 *
 * @author Sorokin Georgy
 */
@Repository
public interface MasterRepository extends CrudRepository<Master, String> {
}
