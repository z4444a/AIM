import React from 'react';
import { Style } from './styles';
import ResourceTypesCard from '../../components/resource-type-card/index';
import { mapDispatchToProps, mapStateToProps } from './index';
import { Path } from '../../../../commons/path';
import { TypeFormModel } from '../../../../model/form/type-form-model';
import { Props as ResourceTypeCardProps } from '../../components/resource-type-card/card';
import _ from 'underscore';

export interface Props {
  onSubmit: (type: TypeFormModel) => void;
  showIdentifiers?: boolean;
  oldModel?: TypeFormModel;

  findParamValue?: (id: number) => void;
  resetRemoveParameterResponse?: () => void;
}

export type InternalProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style;

export class ResourceTypePage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { fetchResourceTypesSuggestions } = this.props;
    if (typeof fetchResourceTypesSuggestions === 'function') {
      fetchResourceTypesSuggestions();
    }
  }

  public componentWillUnmount(): void {
    const {
      resetEditedParameterName,
      resetFormModel,
      resetHighlightEmpty,
      resetParameterFormModel,
      resetCheckUniqueTypeName,
    } = this.props;
    resetParameterFormModel();
    resetFormModel();
    resetEditedParameterName();
    resetCheckUniqueTypeName();
    resetHighlightEmpty();
  }

  public render(): React.ReactNode {
    const {
      classes,
      parameterRows,
      formModel,
      uniqueName,
      editedParameterName,
      highlightEmpty,
      showIdentifiers,
      updateFormModel,
      setRowEditable,
      removeParameterFormModel,
      updateParameterFormModel,
      addParameterRow,
      setEditedParameterName,
      resetEditedParameterName,
      showDialog,
      hideDialog,
      setHighlightEmpty,
      resetHighlightEmpty,
      checkTypeName,
      dialogIsOpen,
      changeOrder,

      onShowOverlay,
      onHideOverlay,

      removedParameterResponse,
      findParamValue,
      resetRemoveParameterResponse,
      typeSuggestions,

      findParamIdentifier,
      identifierValidation,
      setValidation,
    } = this.props;
    const cardProps: ResourceTypeCardProps = {
      dialogIsOpen: dialogIsOpen,
      editedParameterName: editedParameterName,
      highlightEmpty: highlightEmpty,
      onCancelButtonClick: this.handleRedirect,
      onAddParameterRow: addParameterRow,
      onChange: updateFormModel,
      onNameValidationRequested: checkTypeName,
      onCompleteButtonClick: this.handleSubmit,
      onDialogClosed: hideDialog,
      onDialogOpened: showDialog,
      onHighlightEmptyReset: resetHighlightEmpty,
      onHighlightEmptySet: setHighlightEmpty,
      onParameterEditReset: resetEditedParameterName,
      onParameterEditSet: setEditedParameterName,
      onParameterFormChange: updateParameterFormModel,
      onParameterRowEditSet: setRowEditable,
      onParameterRowRemoval: removeParameterFormModel,
      parameterRows: parameterRows,
      showIdentifiers: showIdentifiers,
      type: formModel,
      uniqueName: uniqueName,
      changeOrder: changeOrder,

      onShowOverlay: onShowOverlay,
      onHideOverlay: onHideOverlay,

      removedParameterResponse: removedParameterResponse,
      findParamValue: findParamValue,
      resetRemoveParameterResponse: resetRemoveParameterResponse,
      typeSuggestions: typeSuggestions,

      findParamIdentifier: findParamIdentifier,
      identifierValidation: identifierValidation,
      setValidation: setValidation,
    };
    return (
      <div className={classes.container}>
        <ResourceTypesCard {...cardProps} />
      </div>
    );
  }

  private handleSubmit = () => {
    const { onSubmit, formModel, oldModel, parameterRows } = this.props;
    if (_.isEqual(oldModel, formModel)) {
      this.handleRedirect();
    }
    const { parameters, ...rest } = formModel;
    const formToSubmit: TypeFormModel = {
      parameters: parameterRows.map(value => value.model),
      ...rest,
    };
    onSubmit(formToSubmit);
  };

  private handleRedirect = () => {
    const { redirect, resetHighlightEmpty, resetFormModel } = this.props;
    redirect(Path.RESOURCE_TYPES);
    resetFormModel();
    resetHighlightEmpty();
  };
}
