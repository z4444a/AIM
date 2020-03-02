import React from 'react';
import { TextField } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

export interface Props {
  value: string;
  editable: boolean;
  error?: boolean;
  helperText?: React.ReactNode;
  onChange: (value: string) => void;
}

export type InnerProps = Props & WithTranslation;

export const ParameterNameCell: React.FunctionComponent<InnerProps> = (props: InnerProps) => {
  const { value, editable, onChange, error, helperText } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(event.target.value);

  if (editable) {
    return (
      <TextField
        fullWidth
        error={error}
        helperText={helperText}
        value={value}
        onChange={handleChange}
      />
    );
  }

  return <span>{value}</span>;
};
