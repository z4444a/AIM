package intranet.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main Spring Boot configuration class.
 *
 * @author Sorokin Georgy
 */
@SpringBootApplication(scanBasePackages = "intranet")
public class App {
    /**
     * Application entry point.
     */
    public static void main(final String[] args) {
        SpringApplication.run(App.class);
    }
}
