import ParamValueShortVer from '../../../model/get/param-value-short-ver';
import React, { CSSProperties } from 'react';

export const parameterShortVersionList = (
  parameterValues: ParamValueShortVer[]
): React.ReactNode => {
  if (!parameterValues || parameterValues.length === 0) {
    return '';
  }
  const params = new Set();
  parameterValues.forEach(item => params.add(item.name));
  const parametersNames: string[] = Array.from(params);
  return (
    <div style={parametersNames.length > 3 ? scroll : undefined}>
      {parametersNames.map(name => (
        <p key={name}>
          <b>{name}</b> :
          {parameterValues
            .filter(item => item.name === name)
            .map(item => item.content)
            .join(separator)}
        </p>
      ))}
    </div>
  );
};

const separator = ', ';

const scroll: CSSProperties = {
  overflow: 'auto',
  height: '100px',
};
