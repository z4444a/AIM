import React from 'react';
import { ParameterRowFormModel } from '../../../../../../model/form/parameter-row-form-model';
import { ParameterFormModel } from '../../../../../../model/form/parameter-form-model';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import { WithTranslation } from 'react-i18next';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import ParameterRow from './row/index';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { DragHandle } from '@material-ui/icons';
import { RowProps } from './row/parameter-row';
import arrayMove from 'array-move';
import { ParameterModifier } from '../../../../../../model/parameter-modifier';
import { ResourceTypeSuggestion } from '../../../../../../redux/reducers/request-create-page-reducer';
import { ValidationParameterResponse } from '../../../../../../model/validation-parameter-response';
import { ParameterUniqueFields } from '../../../../../../model/parameters/parameter-unique-fields';

export interface Props {
  parametersModifier: ParameterModifier;
  rows: ParameterRowFormModel[];
  onParamChange: (model: ParameterFormModel, key: number) => void;
  onRemove: (key: number) => void;
  highlightEmpty?: boolean;
  onEditableChange: (editable: boolean, key: number) => void;
  onEditConfirmed: (key: number) => void;
  onEditCanceled: (key: number) => void;
  onParameterNameValidationRequested: (name: string, key: number) => boolean;
  changeOrder: (rows: ParameterRowFormModel[]) => void;
  warningDialogHeader: string;

  onShowOverlay: (text: string) => void;
  onHideOverlay: () => void;

  findParamValue?: (id: number) => void;
  removedParameterResponse: ValidationParameterResponse | null;
  resetRemoveParameterResponse?: () => void;

  typeSuggestions: ResourceTypeSuggestion[];

  findParamIdentifier: (params: ParameterUniqueFields) => void;
  identifierValidation: ValidationParameterResponse | null;
  resetValidation: () => void;
}

export enum Property {
  REQUIRED = 'required',
  VISIBLE_TO_OWNER = 'visibleToOwner',
}

const TableBodySortable = SortableContainer(({ children }: { children: React.ReactNode }) => (
  <TableBody>{children}</TableBody>
));
const DragHandler = SortableHandle(({ style }: { style?: React.CSSProperties }) => (
  <span style={{ ...style, ...{ cursor: 'move' } }}>
    <DragHandle />
  </span>
));
const Row = SortableElement(({ data }: { data: RowProps }) => {
  return <ParameterRow {...data} />;
});

export type InnerProps = Props & WithTranslation;

export class ParameterGrid extends React.PureComponent<InnerProps> {
  private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const { changeOrder, rows } = this.props;
    const newRows = arrayMove(rows, oldIndex, newIndex).map((row, index) => {
      row.model.order = index;
      return row;
    });
    changeOrder(newRows);
  };

  public render(): React.ReactNode {
    const {
      t,
      onParamChange,
      onEditConfirmed,
      onEditCanceled,
      onRemove,
      onParameterNameValidationRequested,
      highlightEmpty,
      rows,
      parametersModifier,
      warningDialogHeader,

      onShowOverlay,
      onHideOverlay,

      findParamValue,
      removedParameterResponse,
      resetRemoveParameterResponse,

      typeSuggestions,

      findParamIdentifier,
      identifierValidation,
      resetValidation,
    } = this.props;
    const style: React.CSSProperties = { textAlign: 'center' };
    return (
      <Table padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell style={style}>&nbsp;</TableCell>
            <TableCell style={style}>{t('parameters.card.nameLabel')}*</TableCell>
            <TableCell style={style}>{t('parameters.card.typeLabel')}</TableCell>
            <TableCell style={style}>{t('parameters.card.requiredLabel')}</TableCell>
            <TableCell style={style}>{t('parameters.card.multivaluedLabel')}</TableCell>
            {parametersModifier === ParameterModifier.ALLOCATION_PARAMETER ? (
              <TableCell style={style}>{t('parameters.card.visibleToOwnerLabel')}</TableCell>
            ) : null}
            <TableCell style={style}>{t('parameters.card.constraintLabel')}</TableCell>
            <TableCell style={style}>{t('parameters.card.identifierLabel')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBodySortable onSortEnd={this.onSortEnd} useDragHandle>
          {rows
            .sort((a, b) => a.model.order - b.model.order)
            .map((row, index) => {
              const rowData: RowProps = {
                row: row,
                parametersModifier: parametersModifier,
                onRemove: onRemove,
                highlightEmpty: highlightEmpty,
                onChange: onParamChange,
                onSetEdit: this.handleEditSet,
                onCancel: onEditCanceled,
                onConfirm: onEditConfirmed,
                onNameValidationRequested: onParameterNameValidationRequested,
                DragHandler: DragHandler,
                warningDialogHeader: warningDialogHeader,

                onShowOverlay: onShowOverlay,
                onHideOverlay: onHideOverlay,

                findParamValue: findParamValue,
                removedParameterResponse: removedParameterResponse,
                resetRemoveParameterResponse: resetRemoveParameterResponse,
                typeSuggestions: typeSuggestions,

                findParamIdentifier: findParamIdentifier,
                identifierValidation: identifierValidation,
                resetValidation: resetValidation,
              };
              return <Row index={index} key={`key-${index}`} data={rowData} />;
            })}
        </TableBodySortable>
      </Table>
    );
  }

  private handleEditSet = (key: number) => {
    const { onEditableChange } = this.props;
    onEditableChange(true, key);
  };
}
