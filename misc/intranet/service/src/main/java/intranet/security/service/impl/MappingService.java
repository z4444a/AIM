package intranet.security.service.impl;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import intranet.security.model.DefaultRequest;
import intranet.security.model.Request;
import intranet.security.service.IMappingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Writer;

/**
 * Implements {@link IMappingService}.
 *
 * @author Sorokin Georgy
 */
@Service
public class MappingService implements IMappingService {

    private static Logger log = LoggerFactory.getLogger(MappingService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MappingService() {
        this.objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public <T> Request<T> toRequest(String params, Class<T> resultClass) {
        try {
            final var rClass = objectMapper.getTypeFactory().constructParametricType(Request.class, resultClass);
            return objectMapper.readValue(params, rClass);
        } catch (IOException e) {
            log.warn("Exception: ", e);
            return null;
        }
    }

    @Override
    public DefaultRequest toRequest(String params) {
        try {
            return objectMapper.readValue(params, DefaultRequest.class);
        } catch (IOException e) {
            log.warn("Exception: ", e);
            return null;
        }
    }

    @Override
    public void writeResponse(Writer writer, Object response) throws IOException {
        objectMapper.writeValue(writer, response);
    }
}
