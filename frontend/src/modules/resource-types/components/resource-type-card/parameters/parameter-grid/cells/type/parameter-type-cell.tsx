import React from 'react';
import { FormControl, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { WithTranslation } from 'react-i18next';
import { ParameterType } from '../../../../../../../../model/parameter-type';
import { ParameterModifier } from '../../../../../../../../model/parameter-modifier';

export interface Props {
  parametersModifier: ParameterModifier;
  value: ParameterType;
  editable: boolean;
  onChange: (value: ParameterType) => void;
}

export type InnerProps = Props & WithTranslation;

export const ParameterTypeCell: React.FunctionComponent<InnerProps> = (props: InnerProps) => {
  const { t, value, editable, onChange, parametersModifier } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as ParameterType);
  };

  const getTypeName = () => {
    switch (value) {
      case ParameterType.NUMBER:
        return t('parameterType.number');
      case ParameterType.TEXT:
        return t('parameterType.text');
      case ParameterType.DATE:
        return t('parameterType.date');
      case ParameterType.LIST:
        return t('parameterType.list');
      case ParameterType.REAL:
        return t('parameterType.real');
      case ParameterType.POOL:
        return parametersModifier === ParameterModifier.POOL_PARAMETER
          ? t('parameterType.pool')
          : '';
    }
  };

  if (editable) {
    return (
      <FormControl fullWidth>
        <Select value={value} onChange={handleChange}>
          <MenuItem value={ParameterType.NUMBER}>{t('parameterType.number')}</MenuItem>
          <MenuItem value={ParameterType.DATE}>{t('parameterType.date')}</MenuItem>
          <MenuItem value={ParameterType.TEXT}>{t('parameterType.text')}</MenuItem>
          <MenuItem value={ParameterType.LIST}>{t('parameterType.list')}</MenuItem>
          <MenuItem value={ParameterType.REAL}>{t('parameterType.real')}</MenuItem>
          {parametersModifier === ParameterModifier.POOL_PARAMETER ? (
            <MenuItem value={ParameterType.POOL}>{t('parameterType.pool')}</MenuItem>
          ) : null}
        </Select>
      </FormControl>
    );
  }

  return <span>{getTypeName()}</span>;
};
