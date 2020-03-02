import React, { Component } from 'react';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TypeFields from './fields/index';
import { TypeFormModel } from '../../../../model/form/type-form-model';
import { ParameterFormModel } from '../../../../model/form/parameter-form-model';
import ParameterList from './parameters/parameter-list/index';
import { Props as ParameterListProps } from './parameters/parameter-list/parameter-list';
import { ParameterRowFormModel } from '../../../../model/form/parameter-row-form-model';
import _ from 'underscore';
import { ParameterModifier } from '../../../../model/parameter-modifier';
import Tooltip from '@material-ui/core/Tooltip';
import { ResourceTypeSuggestion } from '../../../../redux/reducers/request-create-page-reducer';
import { ValidationParameterResponse } from '../../../../model/validation-parameter-response';
import { ParameterUniqueFields } from '../../../../model/parameters/parameter-unique-fields';

export interface Props {
  dialogIsOpen: boolean;
  type: TypeFormModel;
  uniqueName: boolean;
  parameterRows: ParameterRowFormModel[];
  highlightEmpty: boolean;
  showIdentifiers?: boolean;

  onAddParameterRow: (modifier: ParameterModifier) => void;
  onChange: (type: TypeFormModel) => void;
  onNameValidationRequested: (name: string) => boolean;
  onDialogOpened: () => void;
  onDialogClosed: () => void;
  onParameterEditSet: (name: string) => void;
  onParameterEditReset: () => void;
  onParameterFormChange: (index: number, model: ParameterFormModel) => void;
  onHighlightEmptySet: () => void;
  onHighlightEmptyReset: () => void;
  onCompleteButtonClick: () => void;
  onCancelButtonClick: () => void;
  onParameterRowEditSet: (key: number, editable: boolean) => void;
  onParameterRowRemoval: (key: number) => void;
  editedParameterName: string | null;
  changeOrder: (rows: ParameterRowFormModel[]) => void;

  onShowOverlay: (text: string) => void;
  onHideOverlay: () => void;

  findParamValue?: (id: number) => void;
  removedParameterResponse: ValidationParameterResponse | null;
  resetRemoveParameterResponse?: () => void;

  typeSuggestions: ResourceTypeSuggestion[];

  findParamIdentifier: (params: ParameterUniqueFields) => void;
  identifierValidation: ValidationParameterResponse | null;
  setValidation: (params: ValidationParameterResponse | null) => void;
}

export type InternalProps = Props & Style & WithTranslation;

export interface ErrorState {
  picture?: string;
  showTooltip: boolean;
}

export class ResourceTypesCard extends Component<InternalProps, ErrorState> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      showTooltip: true,
    };
  }
  public render(): JSX.Element {
    const {
      classes,
      type,
      uniqueName,
      parameterRows,
      onCancelButtonClick,
      onParameterFormChange,
      onParameterRowEditSet,
      highlightEmpty,
      onAddParameterRow,
      t,

      onShowOverlay,
      onHideOverlay,

      findParamValue,
      removedParameterResponse,
      resetRemoveParameterResponse,

      typeSuggestions,

      findParamIdentifier,
      identifierValidation,
      setValidation,
    } = this.props;
    const { name, description, active, needsBackup, picture, quantitative } = type;
    const parameterListProps: ParameterListProps = {
      onParameterRowModelChange: onParameterFormChange,
      onRemoveButtonClick: this.handleParameterRowRemoval,
      onRowEditSet: onParameterRowEditSet,
      onEditConfirmed: this.handleParameterEditConfirmed,
      onEditCanceled: this.handleParameterEditReset,
      onAddParameterRow: onAddParameterRow,
      highlightEmpty: highlightEmpty,
      rows: parameterRows,
      changeOrder: this.handleChangeOrder,

      onShowOverlay: onShowOverlay,
      onHideOverlay: onHideOverlay,

      findParamValue: findParamValue,
      removedParameterResponse: removedParameterResponse,
      resetRemoveParameterResponse: resetRemoveParameterResponse,

      typeSuggestions: typeSuggestions,

      findParamIdentifier: findParamIdentifier,
      identifierValidation: identifierValidation,
      setValidation: setValidation,
    };
    return (
      <Card className={classes.container}>
        <TypeFields
          errors={this.state}
          imgSource={picture.picturePath}
          imgBytes={picture.picture}
          name={name}
          uniqueName={uniqueName}
          description={description}
          active={active}
          backup={needsBackup}
          quantitative={quantitative}
          onImgByteCodeChange={this.handlePictureIconChange}
          onImgSourceChange={this.handlePictureAddressChange}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          onActiveChange={this.handleCheckBoxChange('active')}
          onBackupChange={this.handleCheckBoxChange('backup')}
          onQuantitativeChange={this.handleCheckBoxChange('quantitative')}
          highlightEmpty={highlightEmpty}
        />
        <Divider />
        <ParameterList {...parameterListProps} />
        <div className={classes.buttonGroup}>
          <Button variant="contained" onClick={onCancelButtonClick}>
            {t('common.cancel')}
          </Button>
          <Tooltip title={this.state.showTooltip ? t('typeCard.tooltips.hasUnconfirmedParam') : ''}>
            <Button
              className={classes.completeButton}
              variant="contained"
              onClick={this.handleCompletion}
            >
              {t('common.complete')}
            </Button>
          </Tooltip>
        </div>
      </Card>
    );
  }

  private handlePictureIconChange = (bytes: number[]) => {
    const { onChange, type } = this.props;
    const newType = {
      ...type,
      picture: {
        ...type.picture,
        picturePath: '',
        picture: bytes,
      },
    };

    onChange(newType);
    this.setState({
      picture: undefined,
    });
  };

  private handlePictureAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { onChange, type } = this.props;

    const newType = {
      ...type,
      picture: {
        ...type.picture,
        picturePath: e.target.value,
        picture: [],
      },
    };

    onChange(newType);
    this.setState({
      picture: undefined,
    });
  };

  private handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { onChange, type, onNameValidationRequested } = this.props;

    const newType = {
      ...type,
      name: e.target.value,
    };

    onChange(newType);
    onNameValidationRequested(e.target.value);
  };

  private handleCheckBoxChange = (field: 'active' | 'backup' | 'quantitative') => (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { onChange, type } = this.props;

    let active = type.active;
    let backup = type.needsBackup;
    let quantitative = type.quantitative;

    switch (field) {
      case 'active':
        active = checked;
        break;
      case 'backup':
        backup = checked;
        break;
      case 'quantitative':
        quantitative = checked;
    }

    const newType = {
      ...type,
      active: active,
      needsBackup: backup,
      quantitative: quantitative,
    };

    onChange(newType);
  };

  private handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { onChange, type } = this.props;

    const newType = {
      ...type,
      description: e.target.value,
    };

    onChange(newType);
  };

  private handleParameterEditConfirmed = (key: number) => {
    const { type, parameterRows, onChange, onParameterRowEditSet } = this.props;
    const { parameters } = type;
    const row = parameterRows.find(row => row.key === key);
    if (!row) {
      return;
    }

    const newParameter = {
      key: row.key,
      ...row.model,
    };

    const changedIndex = parameters.findIndex(value => value.key === newParameter.key);

    const newParams = _.clone(parameters);
    if (changedIndex > -1) {
      newParams[changedIndex] = newParameter;
    } else {
      newParams.push(newParameter);
    }

    const newType = {
      ...type,
      parameters: newParams,
    };
    onChange(newType);
    onParameterRowEditSet(key, false);

    this.setState({
      showTooltip: false,
    });
  };

  private handleParameterEditReset = (key: number) => {
    const {
      type,
      parameterRows,
      onParameterFormChange,
      onParameterRowRemoval,
      onParameterRowEditSet,
    } = this.props;
    const { parameters } = type;
    const row = parameterRows.find(row => row.key === key);
    if (!row) {
      return;
    }

    const changedIndex = parameters.findIndex(value => value.key === row.key);

    if (changedIndex > -1) {
      const prevValue = parameters[changedIndex];
      onParameterFormChange(key, prevValue);
      onParameterRowEditSet(key, false);
    } else {
      onParameterRowRemoval(key);
    }
  };

  private validateType = () => {
    const { name } = this.props.type;
    const picture = this.validatePicture();
    return !!name && this.props.uniqueName && picture;
  };

  private validatePicture = () => {
    const { type, t } = this.props;
    const { picturePath } = type.picture;
    if (picturePath === '') {
      return true;
    }
    const match = picturePath.match(new RegExp('^https?://'));
    const correctPicture = match !== null;
    if (!correctPicture) {
      this.setState({
        picture: t('typeCard.fields.icon.shouldBeginWithHttps'),
      });
    }
    return correctPicture;
  };

  private handleCompletion = () => {
    const { onHighlightEmptySet, parameterRows, onCompleteButtonClick } = this.props;
    const error = !this.validateType() || parameterRows.some(value => value.editable);
    this.setState({
      showTooltip: error,
    });
    if (error) {
      onHighlightEmptySet();
      return;
    }
    onCompleteButtonClick();
  };

  private handleParameterRowRemoval = (key: number) => {
    const { onChange, onParameterRowRemoval, type } = this.props;
    const { parameters } = type;
    onParameterRowRemoval(key);
    const deletedIndex = parameters.findIndex(value => value.key === key);
    if (deletedIndex !== -1) {
      const newParams = [...parameters];
      newParams.splice(deletedIndex, 1);
      const refreshOrder = (item: ParameterFormModel, index: number): ParameterFormModel => {
        const { order, ...rest } = item;
        return {
          ...rest,
          order: index,
        };
      };
      const newType = {
        ...type,
        parameters: newParams.sort((a, b) => a.order - b.order).map(refreshOrder),
      };
      onChange(newType);
    }
  };
  private handleChangeOrder = (modifier: ParameterModifier, rows: ParameterRowFormModel[]) => {
    const { changeOrder, parameterRows } = this.props;
    const oldRows = parameterRows.filter(row => row.model.modifier !== modifier);
    const newRows = [...oldRows, ...rows];
    changeOrder(newRows);
  };
}
