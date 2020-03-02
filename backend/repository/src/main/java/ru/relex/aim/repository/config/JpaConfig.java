package ru.relex.aim.repository.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import ru.relex.aim.repository.repository.base.BaseRepositoryImpl;

/**
 * Class for configuring Spring JPA.
 *
 * @author Alexey Alimov
 */
@Configuration
@EntityScan({"ru.relex.aim.repository.entity", "ru.relex.aim.repository.converter"})
@EnableJpaRepositories(basePackages = {"ru.relex.aim.repository.repository"},
    repositoryBaseClass = BaseRepositoryImpl.class)
@EnableTransactionManagement
@PropertySource("application.properties")
public class JpaConfig {

}
