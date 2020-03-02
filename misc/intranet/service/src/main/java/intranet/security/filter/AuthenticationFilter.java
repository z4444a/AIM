package intranet.security.filter;

import intranet.db.repository.UserRepository;
import intranet.security.config.Intranet;
import intranet.security.model.Response;
import intranet.security.model.params.LoginParams;
import intranet.security.model.result.LoginResult;
import intranet.security.service.IMappingService;
import intranet.security.service.IRestService;
import intranet.security.service.ITokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * The main class of 'rest' api.
 *
 * @author Sorokin Georgy
 */
public class AuthenticationFilter extends OncePerRequestFilter {

    private final IMappingService mappingService;
    private final ITokenService tokenService;
    private final UserRepository repository;
    private final AuthenticationManager manager;
    private final IRestService restService;
    private final Intranet config;

    /**
     * Constructor.
     */
    public AuthenticationFilter(IMappingService mappingService,
                                ITokenService tokenService,
                                UserRepository repository,
                                AuthenticationManager manager,
                                IRestService restService, Intranet config) {
        super();
        this.mappingService = mappingService;
        this.tokenService = tokenService;
        this.repository = repository;
        this.manager = manager;
        this.restService = restService;
        this.config = config;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding(request.getCharacterEncoding());
        final String json;
        try (final var reader = request.getReader()) {
            json = reader.lines().collect(Collectors.joining());
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        final var objectRequest = mappingService.toRequest(json);
        if ("login".equals(objectRequest.getMethod())) {
            authenticateByPassword(json);
            final var prin = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            final var username = (prin instanceof UserDetails) ? ((UserDetails) prin).getUsername() : prin.toString();
            final Response<LoginResult> authResponse = tokenService.generateToken(username);
            response.setStatus(HttpServletResponse.SC_OK);
            try (var writer = response.getWriter()) {
                mappingService.writeResponse(writer, authResponse);
            }
        } else {
            authenticateByToken(request, response);
            final var authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                restService.switchMethod(objectRequest, json, response);
            }
        }
    }

    private void authenticateByPassword(String body) {
        final var loginRequest = mappingService.toRequest(body, LoginParams.class);
        final String password = loginRequest.getParams().getPassword();
        final String login = loginRequest.getParams().getLogin();
        if (password.equals(config.getPassword()) && login.equals(config.getLogin())) {
            final var auth = new UsernamePasswordAuthenticationToken(login, password, Collections.emptySet());
            SecurityContextHolder.getContext().setAuthentication(auth);
            return;
        }
        final var auth = new UsernamePasswordAuthenticationToken(login, password);
        final var authentication = manager.authenticate(auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void authenticateByToken(HttpServletRequest request, HttpServletResponse response) {
        final var token = tokenService.readToken(request);
        if (token == null) {
            restService.throwError(response, -200);
            return;
        }
        final String login = token.getBody().getSubject();
        final var user = repository.findUserByLogin(login);
        if (user == null && !login.equals(config.getLogin())) {
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            return;
        }
        final var auth = new UsernamePasswordAuthenticationToken(login, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}
