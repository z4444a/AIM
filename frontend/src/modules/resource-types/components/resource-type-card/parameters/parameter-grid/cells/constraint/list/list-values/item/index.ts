import React from 'react';
import { ListValueItem } from './list-value-item';
import { withTranslation } from 'react-i18next';
import _ from 'underscore';

export default React.memo(withTranslation('common')(ListValueItem), (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});
