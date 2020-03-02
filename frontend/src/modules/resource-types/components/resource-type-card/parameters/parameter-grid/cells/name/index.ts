import React from 'react';
import { ParameterNameCell } from './parameter-name-cell';
import { withTranslation } from 'react-i18next';

export default React.memo(withTranslation('common')(ParameterNameCell));
