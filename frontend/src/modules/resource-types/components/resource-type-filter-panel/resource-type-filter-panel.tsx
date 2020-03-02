import React, { KeyboardEvent, ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';
import { Style } from './styles';
import { CustomFilterCmpContext } from '../../../../commons/components/aim-data-grid/aim-data-grid';
import { WithTranslation } from 'react-i18next';

export enum FilterField {
  RESOURCE_TYPE_NAME = 'name',
}

export interface Props {
  context: CustomFilterCmpContext;
}

export type InternalProps = Props & Style & WithTranslation;

export class ResourceTypeFilterPanel extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { classes, context, t } = this.props;
    const name =
      context.values && context.values[FilterField.RESOURCE_TYPE_NAME]
        ? context.values[FilterField.RESOURCE_TYPE_NAME] + ''
        : '';
    return (
      <div className={classes.container}>
        <TextField
          value={name}
          fullWidth
          onChange={this.handleFilterTypeChange}
          onKeyPress={this.handleKeyPress}
          label={t('resourceTypePage.grid.columns.name')}
        />
      </div>
    );
  }

  private handleKeyPress = (event: KeyboardEvent) => {
    const { context } = this.props;
    if (event.key === 'Enter' && typeof context.applyFilters === 'function') {
      context.applyFilters();
      event.preventDefault();
    }
  };

  private handleFilterTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { context } = this.props;
    const values = Object.assign({}, context.values, {
      [FilterField.RESOURCE_TYPE_NAME]: event.target.value,
    });
    context.changeFilters(values);
  };
}
