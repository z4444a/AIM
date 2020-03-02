package intranet.security.service.impl;

import intranet.db.entity.User;
import intranet.db.repository.UserRepository;
import intranet.security.config.Method;
import intranet.security.model.DefaultRequest;
import intranet.security.model.ErrorResponse;
import intranet.security.model.Response;
import intranet.security.model.params.UserParams;
import intranet.security.model.result.UserList;
import intranet.security.service.IRestService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Implements {@link IRestService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class RestServiceImpl implements IRestService {

    private final MappingService mappingService;
    private final UserRepository repository;

    /**
     * Constructor.
     */
    public RestServiceImpl(MappingService mappingService, UserRepository repository) {
        this.mappingService = mappingService;
        this.repository = repository;
    }

    /**
     * Selects a method to execute.
     */
    @Override
    public void switchMethod(DefaultRequest request, String body, HttpServletResponse response) {
        try (var writer = response.getWriter()) {
            switch (request.getMethod()) {
                case Method.USER_REQUEST:
                    final var userRequest = mappingService.toRequest(body, UserParams.class);
                    final var user = getUser(userRequest.getParams().getId());
                    mappingService.writeResponse(writer, user);
                    break;
                case Method.USERS_REQUEST:
                    final var users = getUsers();
                    mappingService.writeResponse(writer, users);
                    break;
                default:
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Throws error using ErrorResponse.
     */
    @Override
    public void throwError(HttpServletResponse response, int code) {
        final var error = new ErrorResponse.ErrorValue();
        error.setIntranetCode(code);
        final var errorResponse = new ErrorResponse();
        errorResponse.setError(error);
        try (final var writer = response.getWriter()) {
            response.setStatus(200);
            mappingService.writeResponse(writer, errorResponse);
        } catch (IOException e) {
        }
    }

    private Response<UserList> getUsers() {
        final var list = new UserList();
        list.setUsers(repository.findAll());
        final var response = new Response<UserList>();
        response.setResult(list);
        return response;
    }

    private Response<User> getUser(Integer id) {
        final var response = new Response<User>();
        response.setResult(repository.findById(id).orElseThrow());
        return response;
    }

}
