import React, { ReactNode } from 'react';
import { WithSnackbarProps } from 'notistack';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import { mapDispatchToProps, mapStateToProps } from './index';
import EmployeeCard from '../../components/employee-card/index';
import { RouteComponentProps } from 'react-router';
import { roleById } from '../../../../model/role-id';
import { EmployeeFullModel } from '../../../../model/get/employee-full-model';

export interface Props {}

export interface ChangeRoleParams {
  id: number;
  roleId: number;
}

export type InternalProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithSnackbarProps &
  WithTranslation &
  RouteComponentProps<{ id: string }>;

export class EmployeeChangeRolePage extends React.PureComponent<InternalProps> {
  public componentDidMount(): void {
    const { match, fetchEmployee } = this.props;
    const id = parseInt(match.params.id, 10);
    fetchEmployee(id);
  }

  public render(): ReactNode {
    const { employee } = this.props;

    return (
      <EmployeeCard
        formModel={employee === null ? undefined : employee}
        onFormModelChanged={this.handleOnFormModelChanged}
      />
    );
  }

  private handleOnFormModelChanged = (value: EmployeeFullModel) => {
    const { changeRole } = this.props;
    const dto: ChangeRoleParams = {
      id: value.id,
      roleId: roleById[value.role],
    };
    changeRole(dto);
  };
}
