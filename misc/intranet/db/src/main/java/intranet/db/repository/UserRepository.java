package intranet.db.repository;

import intranet.db.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sorokin Georgy
 */
@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findUserByLogin(String login);

    /**
     * Finds all instances of {@link User}.
     */
    @Override
    List<User> findAll();
}
