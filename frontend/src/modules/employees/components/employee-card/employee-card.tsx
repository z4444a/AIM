import React, { ReactNode } from 'react';

import { Style } from './styles';
import { Card, FormControlLabel } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { EmployeeFullModel } from '../../../../model/get/employee-full-model';
import { Role } from '../../../../commons/role';
import Checkbox from '@material-ui/core/Checkbox';

export interface Props {
  formModel?: EmployeeFullModel;
  onFormModelChanged: (data: EmployeeFullModel) => void;
}

export type InternalProps = Props & Style & WithTranslation;

export class EmployeeCard extends React.PureComponent<InternalProps> {
  public constructor(props: InternalProps) {
    super(props);
  }

  public render(): ReactNode {
    const { classes, t, formModel } = this.props;

    if (!formModel) {
      return <div />;
    }
    return (
      <div className={classes.container}>
        <Card>
          <Typography variant="h6" className={classes.formLine}>
            {formModel.firstName + ' ' + formModel.lastName + ' ' + (formModel.middleName || '')}
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.contentCenter}>
            {t('employeeChangeRolePage.USER')}
            <Switch
              checked={formModel.role === Role.ADMIN}
              color="default"
              onChange={this.toggleAdmin}
            />
            {t('employeeChangeRolePage.ADMIN')}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formModel.role === Role.POOL_CREATOR}
                  disabled={formModel.role === Role.ADMIN}
                  onChange={this.onPoolCreatorChange}
                />
              }
              label={t('employeeChangeRolePage.allowToCreatePool')}
            />
          </div>
        </Card>
      </div>
    );
  }

  private toggleAdmin = () => {
    const { formModel } = this.props;
    if (!formModel) {
      return;
    }
    const newFormModel: EmployeeFullModel = Object.assign({}, formModel);
    newFormModel.role = formModel.role === Role.ADMIN ? Role.USER : Role.ADMIN;
    this.updateFormModel(newFormModel);
  };

  private onPoolCreatorChange = () => {
    const { formModel } = this.props;
    if (!formModel) {
      return;
    }
    const newFormModel: EmployeeFullModel = Object.assign({}, formModel);
    newFormModel.role = formModel.role === Role.POOL_CREATOR ? Role.USER : Role.POOL_CREATOR;
    this.updateFormModel(newFormModel);
  };
  private updateFormModel(formModel: EmployeeFullModel) {
    const { onFormModelChanged } = this.props;
    onFormModelChanged(formModel);
  }
}
