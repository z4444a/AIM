package ru.relex.aim.security.intranet;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.relex.aim.security.config.IntranetConfig;
import ru.relex.aim.security.intranet.model.Request;
import ru.relex.aim.security.intranet.model.Response;
import ru.relex.aim.security.intranet.model.exception.ErrorResponse;
import ru.relex.aim.security.intranet.model.exception.IntranetException;
import ru.relex.aim.security.intranet.model.params.LoginParams;
import ru.relex.aim.security.intranet.model.result.LoginResult;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Provides access to the intranet api.
 * @author Sorokin Georgy
 */

@Profile("intranet")
@Service
@EnableConfigurationProperties(IntranetConfig.class)
public class IntranetProvider {

  private final IntranetConfig intranet;

  private static final String JSONRPC = "2.0";

  private static final String AUTH_HEADER = "X-AUTH";

  private final RestTemplate rest;

  private final HttpHeaders headers;

  private final ObjectMapper objectMapper;

  /**
   * Constructor.  All parameters are required.
   */
  public IntranetProvider(IntranetConfig intranet, ObjectMapper mapper) {
    this.intranet = intranet;
    this.objectMapper = mapper;
    this.rest = new RestTemplate();
    rest.getMessageConverters()
        .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
    this.headers = new HttpHeaders();
    this.headers.add("Content-Type", MediaType.APPLICATION_JSON_UTF8_VALUE);
  }

  /**
   * Makes generic request to the intranet.
   *
   * @param method      is name of method in intranet api
   * @param body        is request body
   * @param resultClass is expected response type
   * @throws IntranetException if the intranet sends an error
   */
  public <E, T> T post(LoginParams authParam, String method, E body, Class<T> resultClass) throws IOException {
    final Request<E> newRequest = new Request<>(JSONRPC, 1, method, body);
    final String json = objectMapper.writeValueAsString(newRequest);
    final HttpEntity<String> request = new HttpEntity<>(json, headers);
    final ResponseEntity<String> entity = rest.exchange(intranet.getServer(), HttpMethod.POST, request, String.class);
    if (entity.getStatusCodeValue() != HttpStatus.OK.value() || entity.getBody() == null) {
      throw new IntranetException("response status is not 200 or response result is null");
    }
    if (entity.getBody().contains("error")) {
      final ErrorResponse errorResponse = objectMapper.readValue(entity.getBody(), ErrorResponse.class);
      final int code = errorResponse.getError().getIntranetCode();
      if (code != -200) {
        throw new IntranetException(errorResponse.getError().getMessage());
      }

      final var auth = (authParam == null) ? new LoginParams(intranet.getLogin(), intranet.getPassword()) : authParam;
      final var loginResponse = post(auth, "login", auth, LoginResult.class);
      this.headers.set(AUTH_HEADER, loginResponse.getHashKey());
      return post(auth, method, body, resultClass);
    }
    final var responseClass = objectMapper.getTypeFactory().constructParametricType(Response.class, resultClass);
    final Response<T> response = objectMapper.readValue(entity.getBody(), responseClass);
    return response.getResult();
  }
}
