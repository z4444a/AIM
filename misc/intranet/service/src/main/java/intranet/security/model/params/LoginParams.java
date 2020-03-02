package intranet.security.model.params;

/**
 * Keeps login request params.
 *
 * @author Sorokin Georgy
 */
public class LoginParams {

    private String login;

    private String password;

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
