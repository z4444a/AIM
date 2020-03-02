package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.validation.annotation.HasRegexSyntax;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * Validation annotation for checking if
 * the given regex can be used to check strings.
 */
public class ConstraintRegexSyntaxValidator implements ConstraintValidator<HasRegexSyntax, String> {

  @Override
  public boolean isValid(String regex, ConstraintValidatorContext context) {
    if (regex == null) {
      return true;
    }
    if (regex.isBlank()) {
      return false;
    }
    try {
      Pattern.compile(regex);
      return true;
    } catch (IllegalArgumentException e) {
      return false;
    }
  }
}
