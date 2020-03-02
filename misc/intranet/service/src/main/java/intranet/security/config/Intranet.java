package intranet.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;

/**
 * Keeps properties for intranet authentication.
 *
 * @author Sorokin Georgy
 */
@Configuration
@Primary
@PropertySource("file:${LDAP_PATH}")
@ConfigurationProperties(prefix = "intranet")
public class Intranet {

    private String server;

    private String login;

    private String password;

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
