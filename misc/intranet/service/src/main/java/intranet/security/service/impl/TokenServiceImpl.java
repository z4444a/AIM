package intranet.security.service.impl;

import intranet.db.entity.User;
import intranet.db.repository.UserRepository;
import intranet.security.model.Response;
import intranet.security.model.result.LoginResult;
import intranet.security.service.ITokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * Implements {@link ITokenService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class TokenServiceImpl implements ITokenService {

    private static final String AUTHORIZATION = "X-AUTH";
    private static final int ACCESS_TIME = 30;
    private static final Key SIGNING_KEY;

    private final UserRepository repository;

    static {
        final SecureRandom secureRandom = new SecureRandom();

        final byte[] bytes = new byte[512 / 8];
        secureRandom.nextBytes(bytes);

        SIGNING_KEY = Keys.hmacShaKeyFor(bytes);
    }

    public TokenServiceImpl(UserRepository repository) {
        this.repository = repository;
    }


    @Override
    public Response<LoginResult> generateToken(String username) {
        final User user = repository.findUserByLogin(username);
        Integer id = user != null ? user.getId() : 0;
        final var result = new LoginResult();
        result.setId(id);
        final var now = Instant.now();
        final String accessToken =
                Jwts.builder().signWith(SIGNING_KEY)
                        .setSubject(username)
                        .setIssuedAt(Date.from(now))
                        .setExpiration(Date.from(now.plus(ACCESS_TIME, ChronoUnit.MINUTES)))
                        .compact();
        final var response = new Response<LoginResult>();
        result.setHashKey(accessToken);
        response.setResult(result);
        return response;
    }

    @Override
    public Jws<Claims> readToken(final HttpServletRequest request) {

        final String header = request.getHeader(AUTHORIZATION);

        if (header == null) {
            return null;
        }

        try {
            return Jwts
                    .parser()
                    .setSigningKey(SIGNING_KEY)
                    .parseClaimsJws(header);
        } catch (JwtException e) {
            return null;
        }
    }
}
