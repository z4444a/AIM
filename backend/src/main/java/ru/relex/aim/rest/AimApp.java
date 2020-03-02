package ru.relex.aim.rest;

import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Entry point for AIM application.
 *
 * @author Nikita Skornyakov
 * @since 0.1
 */
@SpringBootApplication(scanBasePackages = "ru.relex.aim")
@EnableSwagger2
public class AimApp {

  private static final String CONFIG_LOCATION = "spring.config.location";

  /**
   * Application entry point.
   */
  public static void main(final String[] args) {
    var ldapPath = System.getenv("LDAP_PATH");
    if (ldapPath != null) {
      if (!ldapPath.startsWith("file:")) {
        ldapPath = "file:".concat(ldapPath);
      }
    }
    final var sysProp = System.getProperty(CONFIG_LOCATION);
    System.setProperty(CONFIG_LOCATION,
        Stream.of("classpath:application.yaml", ldapPath, sysProp)
            .filter(Objects::nonNull)
            .collect(Collectors.joining(",")));
    SpringApplication.run(AimApp.class, args);
  }

  /**
   * Springfox docket configuration.
   * Applies to the whole application API.
   *
   * @return Object describing documentation.
   * @author Alexey Alimov
   */
  @Bean
  public Docket aimApi() {
    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .apis(RequestHandlerSelectors.basePackage("ru.relex.aim.rest.api"))
        .build();
  }
}
