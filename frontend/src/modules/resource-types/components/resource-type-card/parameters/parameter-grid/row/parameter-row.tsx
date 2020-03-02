import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ParameterNameCell from '../cells/name/index';
import ParameterTypeCell from '../cells/type/index';
import ParameterPropertyCell from '../cells/property/index';
import ParameterConstraintCell from '../cells/constraint/index';
import { Property } from '../parameter-grid';
import { ParameterRowFormModel } from '../../../../../../../model/form/parameter-row-form-model';
import { ParameterFormModel } from '../../../../../../../model/form/parameter-form-model';
import { ParameterType } from '../../../../../../../model/parameter-type';
import { ParameterConstraintFormModel } from '../../../../../../../model/form/parameter-constraint-form-model';
import _ from 'underscore';
import { IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { Check, Clear, Delete } from '@material-ui/icons';
import { WithTranslation } from 'react-i18next';
import moment from 'moment';
import { Style } from './styles';
import WarningDialog from './warning-dialog/index';
import { ValidationParameterResponse } from '../../../../../../../model/validation-parameter-response';
import { ParameterUniqueFields } from '../../../../../../../model/parameters/parameter-unique-fields';
import { FieldType } from '../../../../../../../commons/components/generic-fields/models/field-config.model';
import NumberField from '../../../../../../../commons/components/generic-fields/number-field/index';
import { ParameterModifier } from '../../../../../../../model/parameter-modifier';
import { ResourceTypeSuggestion } from '../../../../../../../redux/reducers/request-create-page-reducer';

export interface Props {
  parametersModifier: ParameterModifier;
  row: ParameterRowFormModel;
  onRemove: (key: number) => void;
  onChange: (param: ParameterFormModel, key: number) => void;
  onSetEdit: (key: number) => void;
  onCancel: (key: number) => void;
  onConfirm: (key: number) => void;
  highlightEmpty?: boolean;
  onNameValidationRequested: (name: string, key: number) => boolean;
  DragHandler: React.ComponentClass;
  warningDialogHeader: string;

  onShowOverlay: (text: string) => void;
  onHideOverlay: () => void;

  findParamValue?: (id: number) => void;
  resetRemoveParameterResponse?: () => void;
  removedParameterResponse: ValidationParameterResponse | null;

  findParamIdentifier: (params: ParameterUniqueFields) => void;
  identifierValidation: ValidationParameterResponse | null;
  resetValidation: () => void;

  typeSuggestions: ResourceTypeSuggestion[];
}

export interface State {
  highlightEmptyInternal: boolean;
  openWarningDialog: boolean;
}
export type InnerProps = Props & WithTranslation & Style;
export type RowProps = Props;

export class ParameterRow extends React.Component<InnerProps, State> {
  private readonly MULTIPLE_LIMIT = 50;
  private readonly requiredCallBack: (value: boolean) => void;
  private readonly visibleToOwnerCallBack: (value: boolean) => void;

  public constructor(props: InnerProps) {
    super(props);
    this.requiredCallBack = this.handlePropertyChange(Property.REQUIRED);
    this.visibleToOwnerCallBack = this.handlePropertyChange(Property.VISIBLE_TO_OWNER);

    this.state = {
      highlightEmptyInternal: false,
      openWarningDialog: false,
    };
  }

  public componentDidUpdate(prevProps: Readonly<InnerProps>, prevState: Readonly<State>): void {
    this.checkRemoving();
    this.checkConfirmation(prevProps);
  }

  private checkRemoving = () => {
    const { removedParameterResponse, onHideOverlay, row } = this.props;
    if (removedParameterResponse === null) {
      return;
    }
    if (removedParameterResponse.id === row.model.id) {
      onHideOverlay();
      if (removedParameterResponse.validationPassed) {
        this.remove();
        return;
      }
      this.isWarningDialogActive(true);
    }
  };

  private checkConfirmation = (prevProps: Readonly<InnerProps>) => {
    const { identifierValidation, onHideOverlay, row, onConfirm, resetValidation } = this.props;
    if (_.isEqual(this.props.identifierValidation, prevProps.identifierValidation)) {
      return;
    }
    if (identifierValidation === null) {
      return;
    }
    if (identifierValidation.id === row.key) {
      onHideOverlay();
      if (identifierValidation.validationPassed) {
        onConfirm(row.key);
        resetValidation();
        return;
      }
    }
  };

  public shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>): boolean {
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
  }

  public componentWillUnmount(): void {
    const { resetValidation } = this.props;
    resetValidation();
  }

  public render(): React.ReactNode {
    const {
      row,
      highlightEmpty,
      t,
      DragHandler,
      parametersModifier,
      classes,
      warningDialogHeader,

      typeSuggestions,
    } = this.props;
    const { highlightEmptyInternal } = this.state;
    const { model, editable } = row;
    const { name, parameterType, required, constraint, visibleToOwner, identifier } = model;
    const nameIsValid = this.handleNameValidation();
    return (
      <TableRow>
        <TableCell style={{ width: '3%', paddingBottom: '18px' }}>
          <DragHandler />
        </TableCell>
        <TableCell style={{ width: '20%', paddingBottom: '18px', textAlign: 'center' }}>
          <ParameterNameCell
            value={name}
            error={!nameIsValid}
            helperText={!nameIsValid && !!name ? t('typeCard.error.uniqueName') : undefined}
            editable={editable}
            onChange={this.handleNameChange}
          />
        </TableCell>
        <TableCell style={{ width: '15%', paddingBottom: '18px', textAlign: 'center' }}>
          <ParameterTypeCell
            parametersModifier={parametersModifier}
            value={parameterType}
            editable={editable}
            onChange={this.handleTypeChange}
          />
        </TableCell>
        <TableCell style={{ width: '5%', paddingBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ParameterPropertyCell
              value={required}
              editable={editable}
              onChange={this.requiredCallBack}
            />
          </div>
        </TableCell>
        <TableCell style={{ width: '10%', paddingBottom: '18px', textAlign: 'center' }}>
          {editable ? (
            <NumberField
              positive
              needTooltip
              value={constraint.multipleMax}
              fieldConfig={{
                disabled: !editable,
                fieldType: FieldType.Number,
                key: 'min',
                required: false,
                InputProps: {
                  placeholder: '1',
                },
                constraints: {
                  minNumberValue: 1,
                  maxNumberValue: this.MULTIPLE_LIMIT,
                },
              }}
              handlers={{
                onValueChange: this.handleMultipleMaxChange,
              }}
            />
          ) : (
            constraint.multipleMax || 1
          )}
        </TableCell>
        {parametersModifier === ParameterModifier.ALLOCATION_PARAMETER ? (
          <TableCell style={{ width: '5%', paddingBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ParameterPropertyCell
                value={visibleToOwner || false}
                editable={editable}
                onChange={this.visibleToOwnerCallBack}
              />
            </div>
          </TableCell>
        ) : null}
        <TableCell style={{ width: '30%', textAlign: 'center' }}>
          <ParameterConstraintCell
            value={constraint}
            type={parameterType}
            editable={editable}
            highlightEmpty={highlightEmpty || highlightEmptyInternal}
            onChange={this.handleConstraintChange}
            onSetPoolTypeId={this.onSetPoolTypeId}
            typeSuggestions={typeSuggestions}
            poolTypeId={model.poolTypeId}
          />
        </TableCell>
        <TableCell style={{ width: '15%', paddingBottom: '18px', textAlign: 'center' }}>
          <ParameterNameCell
            value={identifier}
            error={this.identifierValidationError()}
            helperText={this.generateHelperText()}
            editable={editable}
            onChange={this.handleIdentifierChange}
          />
        </TableCell>
        <TableCell style={{ width: '2%', paddingBottom: '18px' }} align="center">
          {editable ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                className={highlightEmpty ? classes.lighted : undefined}
                onClick={this.handleConfirmation}
              >
                <Check />
              </IconButton>
              <IconButton onClick={this.handleCancelation}>
                <Clear />
              </IconButton>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={this.onEdit}>
                <Edit />
              </IconButton>
              <IconButton onClick={this.onRemoveButtonClick}>
                <Delete />
              </IconButton>
            </div>
          )}
        </TableCell>
        <WarningDialog
          open={this.state.openWarningDialog}
          confirmAction={this.remove}
          cancelAction={this.cancel}
          header={warningDialogHeader}
          content={t('typeCard.parameters.warnings.dataLossPossible')}
        />
      </TableRow>
    );
  }

  private onSetPoolTypeId = (id: number) => {
    const { onChange, row } = this.props;
    const { model, key } = row;
    const newParam = {
      ...model,
      poolTypeId: id,
    };
    onChange(newParam, key);
  };

  private matchTest = () => {
    const identifier = this.props.row.model.identifier;
    const match = identifier.match(new RegExp('^[a-zA-Z]\\w*$'));
    return match !== null && match.some(p => p.length === identifier.length);
  };

  private onEdit = () => {
    const { onSetEdit, row } = this.props;
    onSetEdit(row.key);
  };
  private generateHelperText = () => {
    const { t, row, identifierValidation } = this.props;
    if (!row.model.identifier || row.model.identifier.length === 0) {
      return '';
    }
    if (!this.matchTest()) {
      return t('typeCard.error.mismatchingIdentifier');
    }
    if (
      identifierValidation !== null &&
      !identifierValidation.validationPassed &&
      identifierValidation.id === row.key
    ) {
      return t('typeCard.error.uniqueIdentifier');
    }
    return '';
  };

  private identifierValidationError = () => {
    const { row, identifierValidation } = this.props;
    const identifier: string = row.model.identifier;
    if (!identifier || identifier.length === 0) {
      return false;
    }
    const unique =
      identifierValidation === null ||
      identifierValidation.validationPassed ||
      identifierValidation.id !== row.key;
    return !(unique && this.matchTest());
  };

  private handleIdentifierChange = (value: string) => {
    const { row, onChange, resetValidation } = this.props;
    const { model, key } = row;
    const newParameter: ParameterFormModel = {
      ...model,
      identifier: value,
    };

    resetValidation();
    onChange(newParameter, key);
  };

  private onRemoveButtonClick = () => {
    const { row, findParamValue, onShowOverlay, t } = this.props;
    if (!row.model.id) {
      this.remove();
      return;
    }
    if (findParamValue) {
      onShowOverlay(t('typeCard.overlay.checkRemoveOpportunity'));
      findParamValue(row.model.id);
    }
  };

  private isWarningDialogActive = (open: boolean) => {
    this.setState({
      openWarningDialog: open,
    });
  };

  private remove = () => {
    const { onRemove, row } = this.props;
    this.isWarningDialogActive(false);
    onRemove(row.key);
  };

  private cancel = () => {
    const { resetRemoveParameterResponse } = this.props;
    if (resetRemoveParameterResponse) {
      resetRemoveParameterResponse();
    }
    this.isWarningDialogActive(false);
  };

  private handleNameChange = (value: string) => {
    const { row, onChange } = this.props;
    const { model, key } = row;

    const newParameter = {
      ...model,
      name: value,
    };

    onChange(newParameter, key);
  };

  private handleTypeChange = (value: ParameterType) => {
    const { row, onChange } = this.props;
    const { model, key } = row;
    const { multipleMax } = model.constraint;
    const constraint = {
      multipleMax,
    };
    const newParameter = {
      ...model,
      parameterType: value,
      constraint,
    };

    onChange(newParameter, key);
  };

  private handlePropertyChange = (type: Property) => (value: boolean) => {
    const { row, onChange } = this.props;
    const { model, key } = row;

    const option: Partial<ParameterFormModel> = {};

    switch (type) {
      case Property.REQUIRED:
        option.required = value;
        break;
      case Property.VISIBLE_TO_OWNER:
        option.visibleToOwner = value;
        break;
      default:
        return;
    }

    const newParameter = {
      ...model,
      ...option,
    };

    onChange(newParameter, key);
  };

  private handleConstraintChange = (value: ParameterConstraintFormModel) => {
    const { row, onChange } = this.props;
    const { model, key } = row;
    const { multipleMax, ...rest } = value;
    const constraint: ParameterConstraintFormModel = {
      ...rest,
      multipleMax: model.constraint.multipleMax,
    };
    const newParameter = {
      ...model,
      constraint,
    };

    onChange(newParameter, key);
  };

  private handleMultipleMaxChange = (value: number | undefined, k: string) => {
    if ((value && value > this.MULTIPLE_LIMIT) || value === 0) {
      return;
    }
    const { row, onChange } = this.props;
    const { model, key } = row;
    const { multipleMax, ...rest } = model.constraint;
    const constraint = {
      multipleMax: value,
      ...rest,
    };
    const newParameter = {
      ...model,
      constraint,
    };

    onChange(newParameter, key);
  };

  private handleConfirmation = () => {
    const {
      onConfirm,
      onNameValidationRequested,
      row,
      findParamIdentifier,
      onShowOverlay,
      t,
      resetValidation,
    } = this.props;
    const { model, key } = row;
    if (
      !this.validateConstraints() ||
      !model.name ||
      !onNameValidationRequested(model.name, key) ||
      !this.validatePoolParam(model)
    ) {
      this.setState({
        highlightEmptyInternal: true,
      });
      return;
    }

    this.setState({
      highlightEmptyInternal: false,
    });
    const identifier = row.model.identifier;
    if (!identifier || identifier.length === 0) {
      onConfirm(row.key);
      resetValidation();
      return;
    }

    if (this.identifierValidationError()) {
      return;
    }
    onShowOverlay(t('typeCard.overlay.checkCreateOpportunity'));
    const params: ParameterUniqueFields = {
      key: row.key,
      identifier: row.model.identifier,
      modifier: row.model.modifier,
      id: row.model.id,
    };
    findParamIdentifier(params);
  };

  private validatePoolParam = (model: ParameterFormModel) => {
    const { parameterType, poolTypeId } = model;
    return (parameterType === ParameterType.POOL) === !!poolTypeId;
  };
  private handleCancelation = () => {
    const { onCancel, row, resetValidation } = this.props;

    this.setState({
      highlightEmptyInternal: false,
    });
    resetValidation();
    onCancel(row.key);
  };

  private validateConstraints = (): boolean => {
    const { constraint, parameterType } = this.props.row.model;

    switch (parameterType) {
      case ParameterType.NUMBER:
        const { minNumberValue, maxNumberValue } = constraint;
        if (!minNumberValue || !maxNumberValue) {
          return true;
        }

        return maxNumberValue > minNumberValue;
      case ParameterType.DATE:
        const { minDateValue, maxDateValue } = constraint;
        if (!minDateValue || !maxDateValue) {
          return true;
        }

        return moment(maxDateValue).isAfter(minDateValue);
      case ParameterType.LIST:
        const { listValues } = constraint;
        return (
          !!listValues &&
          !!listValues.length &&
          !listValues.some(
            (value, index) =>
              !value.content ||
              listValues.slice(index + 1).some(value1 => value1.content === value.content)
          )
        );
      case ParameterType.REAL:
        const { minRealValue, maxRealValue } = constraint;
        if (!minRealValue || !maxRealValue) {
          return true;
        }
        return maxRealValue > minRealValue;
      case ParameterType.TEXT:
        const { maxStringLength, regExp } = constraint;
        if (!maxStringLength && !regExp) {
          return true;
        }
        if (maxStringLength) {
          return maxStringLength > 0;
        }
        if (regExp) {
          if (regExp.trim().length === 0) {
            return false;
          }
          try {
            const regex = new RegExp(regExp);
            return !!regex;
          } catch (error) {}
        }
        return false;
      default:
        return true;
    }
  };

  private handleNameValidation = (): boolean => {
    const { onNameValidationRequested, row, highlightEmpty } = this.props;
    const { highlightEmptyInternal } = this.state;

    const emptyCheck = !(highlightEmpty || highlightEmptyInternal) || !!row.model.name;

    return emptyCheck && onNameValidationRequested(row.model.name, row.key);
  };
}
