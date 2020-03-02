import React from 'react';
import { Checkbox } from '@material-ui/core';

export interface Props {
  value: boolean;
  editable: boolean;
  onChange: (value: boolean) => void;
}

export const ParameterPropertyCell: React.FunctionComponent<Props> = (props: Props) => {
  const { value, editable, onChange } = props;

  const handleChange = (event: React.ChangeEvent, checked: boolean) => onChange(checked);

  return <Checkbox checked={value} disabled={!editable} onChange={handleChange} />;
};
