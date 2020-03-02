import React, { KeyboardEvent, ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';
import { Style } from './styles';
import { CustomFilterCmpContext } from '../../../../commons/components/aim-data-grid/aim-data-grid';
import { WithTranslation } from 'react-i18next';

export enum FilterField {
  EMPLOYEE_LAST_NAME = 'lastName',
}

export interface Props {
  context: CustomFilterCmpContext;
}

export type InternalProps = Props & Style & WithTranslation;

export class EmployeesFilterPanel extends React.PureComponent<InternalProps> {
  public render(): ReactNode {
    const { classes, context, t } = this.props;
    const name =
      context.values && context.values[FilterField.EMPLOYEE_LAST_NAME]
        ? context.values[FilterField.EMPLOYEE_LAST_NAME] + ''
        : '';
    return (
      <div className={classes.container}>
        <TextField
          value={name}
          fullWidth
          onChange={this.handleFilterTypeChange}
          onKeyPress={this.handleKeyPress}
          label={t('employeePage.grid.columns.lastName')}
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
      [FilterField.EMPLOYEE_LAST_NAME]: event.target.value,
    });
    context.changeFilters(values);
  };
}
