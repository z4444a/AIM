package intranet.db.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author Sorokin Georgy
 */
@Configuration
@EntityScan("intranet.db.entity")
@EnableJpaRepositories(basePackages = "intranet.db.repository")
@EnableTransactionManagement
@PropertySource("application.properties")
public class JpaConfig {
}
