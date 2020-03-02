package ru.relex.aim.service.validation.validator;

import ru.relex.aim.service.validation.annotation.ParameterIdentifierSyntax;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.function.Predicate;
import java.util.regex.Pattern;

/**
 * Checks if a parameter identifier starts with a letter and contains only numbers, letters and the underscore.
 */
public class ParameterIdentifierSyntaxValidator implements ConstraintValidator<ParameterIdentifierSyntax, String> {
  private static final Predicate<String> HAS_IDENTIFIER_SYNTAX = Pattern.compile("^[a-zA-Z]\\w*$").asMatchPredicate();

  @Override
  public boolean isValid(String identifier, ConstraintValidatorContext context) {
    if (identifier == null || identifier.isBlank()) {
      return true;
    }
    return HAS_IDENTIFIER_SYNTAX.test(identifier);
  }
}
