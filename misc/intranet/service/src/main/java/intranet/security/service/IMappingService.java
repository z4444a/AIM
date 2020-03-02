package intranet.security.service;

import intranet.security.model.DefaultRequest;
import intranet.security.model.Request;

import java.io.IOException;
import java.io.Writer;

/**
 * Contains methods using mapper.
 *
 * @author Sorokin Georgy
 */
public interface IMappingService {
    /**
     * Casts to request.
     */
    <T> Request<T> toRequest(String params, Class<T> resultClass);

    /**
     * Casts to default request.
     */
    DefaultRequest toRequest(String params);

    /**
     * Writes payload to response.
     */
    void writeResponse(Writer writer, Object response) throws IOException;
}
