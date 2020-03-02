package ru.relex.aim.service.validation.code;


/**
 * Holds codes to validated parameters.
 * Used as a message in constraint violations in combination with {@link ConstraintCode}.
 */
public class ParameterCode {

  //request errors - 01 - 15
  public static final String REQUEST = "01";
  public static final String REQUEST_USAGE_START = "02";
  public static final String REQUEST_USAGE_FINISH = "03";
  public static final String REQUEST_NEEDS_BACKUP = "04";
  public static final String REQUEST_MONITORING = "05";
  public static final String REQUEST_AUTHOR_ID = "06";
  public static final String REQUEST_PROJECT_ID = "07";
  public static final String REQUEST_TYPE_ID = "08";
  public static final String REQUEST_STATUS_ID = "09";
  public static final String REQUEST_ID = "10";

  //resource pool errors - 16 - 25
  public static final String POOL = "16";
  public static final String POOL_ID = "17";
  public static final String POOL_NAME = "18";
  public static final String POOL_CAPACITY = "19";
  public static final String POOL_PRIORITY = "20";
  public static final String POOL_MONITORING = "21";
  public static final String POOL_ACTIVE = "22";
  public static final String POOL_TYPE_ID = "23";
  public static final String POOL_ALLOCATION_ID = "24";
  //resource type errors - 26 - 35

  public static final String TYPE = "26";
  public static final String TYPE_ID = "27";
  public static final String TYPE_NAME = "28";
  public static final String TYPE_ACTIVE = "29";
  public static final String TYPE_NEEDS_BACKUP = "30";
  public static final String TYPE_QUANTITATIVE = "31";
  //resource allocation - 36 - 45

  public static final String ALLOCATION = "36";

  //resource parameter - 46 - 55
  public static final String PARAMETER = "46";
  public static final String PARAMETER_ID = "47";
  public static final String PARAMETER_NAME = "48";
  public static final String PARAMETER_MODIFIER = "49";
  public static final String PARAMETER_REQUIRED = "50";
  public static final String PARAMETER_ORDER = "51";
  public static final String PARAMETER_IDENTIFIER = "52";

  //category picture - 56 - 60
  public static final String PICTURE = "56";
  public static final String PICTURE_ID = "57";
  public static final String PICTURE_PATH = "58";
  public static final String PICTURE_ICON = "59";

  //value list - 61 - 65
  public static final String LIST_VALUE = "61";
  public static final String LIST_VALUE_ID = "62";
  public static final String LIST_VALUE_CONTENT = "63";
  public static final String LIST_VALUE_ORDER = "64";

  public static final String PARAMETER_VALUE = "64";

  //parameter constraint 66-75
  public static final String PARAM_CONSTR = "66";
  public static final String PARAM_CONSTR_ID = "67";
  public static final String PARAM_CONSTR_MIN_DAT = "68";
  public static final String PARAM_CONSTR_MAX_DAT = "69";
  public static final String PARAM_CONSTR_MAX_STR = "70";

  //parameter type 76-80
  public static final String PARAM_TYPE = "76";
  public static final String PARAM_TYPE_ID = "77";
  public static final String PARAM_TYPE_NAME = "78";


  private ParameterCode() {
  }
}
