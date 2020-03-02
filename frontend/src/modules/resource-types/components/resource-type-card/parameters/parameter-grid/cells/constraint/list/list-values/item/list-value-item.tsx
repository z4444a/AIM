import { ListValueCreateModel } from '../../../../../../../../../../../model/create/list-value-create-model';
import { TextField } from '@material-ui/core';
import React from 'react';
import { WithTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

export interface Props {
  onChange: (value: string, index: number) => void;
  onValidationRequested: (index: number) => boolean;
  item: ListValueCreateModel;
  highlightEmpty?: boolean;
  index: number;
  editable?: boolean;
  onRemove: (index: number) => void;
  DragHandler: React.ComponentClass;
}

export type InnerProps = Props & WithTranslation;

export const ListValueItem: React.FunctionComponent<InnerProps> = (props: InnerProps) => {
  const {
    item,
    editable,
    index,
    onValidationRequested,
    highlightEmpty,
    onChange,
    onRemove,
    t,
    DragHandler,
  } = props;

  const valid = onValidationRequested(index);

  return (
    <>
      <DragHandler />
      <TextField
        required
        disabled={!editable}
        fullWidth
        type={'text'}
        error={!valid || (highlightEmpty && !item.content)}
        label={t('listValues.contentLabel') + (index + 1)}
        value={item.content}
        onChange={e => onChange(e.target.value, index)}
        helperText={!valid ? t('listValues.errorText') : undefined}
      />
      <IconButton disabled={!editable} id="removeButton" onClick={() => onRemove(index)}>
        <Delete />
      </IconButton>
    </>
  );
};
