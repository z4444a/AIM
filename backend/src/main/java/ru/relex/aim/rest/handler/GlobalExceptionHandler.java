package ru.relex.aim.rest.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.relex.aim.service.exception.ParameterValidationException;
import ru.relex.aim.service.model.errors.ApiErrorDto;
import ru.relex.aim.service.model.errors.ApiErrorFieldValidationDto;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.stream.Collectors;


/**
 * Intercepts exceptions thrown in application.
 *
 * @author Alexey Alimov
 */
@ControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Handles ConstraintViolationException.
   *
   * @param exception {@link ConstraintViolationException} exception object
   * @return {@link ResponseEntity} with error dto
   */
  @ExceptionHandler({ConstraintViolationException.class})
  public ResponseEntity<ApiErrorDto> handleConstraintViolation(ConstraintViolationException exception) {

    final var errorList = exception.getConstraintViolations()
        .stream()
        .map(ConstraintViolation::getMessage)
        .map(ApiErrorFieldValidationDto::new)
        .collect(Collectors.toList());

    return new ResponseEntity<>(ApiErrorDto.fieldValidationError(errorList), HttpStatus.BAD_REQUEST);
  }

  /**
   * Handles ParameterValidationException.
   *
   * @param exception {@link ParameterValidationException} exception object
   * @return {@link ResponseEntity} with error dto
   */
  @ExceptionHandler({ParameterValidationException.class})
  public ResponseEntity<ApiErrorDto> handleConstraintViolation(ParameterValidationException exception) {
    return new ResponseEntity<>(ApiErrorDto.parameterValidationError(
        exception.getParameterId(), exception.getErrorCode(), exception.getMessage()), exception.getStatus());
  }
}
