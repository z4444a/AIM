package intranet.security.service;

import intranet.security.model.Response;
import intranet.security.model.result.LoginResult;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

import javax.servlet.http.HttpServletRequest;

/**
 * Generates and reads jwt.
 *
 * @author Sorokin Georgy
 */
public interface ITokenService {

    /**
     * Generates both login and refresh tokens based on authentication data.
     * Parameter is required.
     *
     * @param login used to retrieve user info from database.
     * @return authentication response which contains generated JWT tokens.
     */
    Response<LoginResult> generateToken(final String login);

    /**
     * Reads the authentication token from request.
     *
     * @param request contains token
     * @return claims of token which contains user's authentication data
     */
    Jws<Claims> readToken(HttpServletRequest request);
}
