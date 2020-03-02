package intranet.security.service;

import intranet.security.model.DefaultRequest;

import javax.servlet.http.HttpServletResponse;

/**
 * Selects, executes and interrupts methods.
 *
 * @author Sorokin Georgy
 */
public interface IRestService {

    /**
     * Selects a method to execute.
     */
    void switchMethod(DefaultRequest request, String body, HttpServletResponse response);

    /**
     * Throws error using ErrorResponse.
     */
    void throwError(HttpServletResponse response, int code);
}
