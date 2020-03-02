import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Path } from '../../../../commons/path';
import { EmployeeFullModel } from '../../../../model/get/employee-full-model';
import Sync from '@material-ui/icons/Sync';
import {
  FilterValueType,
  Props as DataGridProps,
} from '../../../../commons/components/aim-data-grid/aim-data-grid';
import AimDataGrid from '../../../../commons/components/aim-data-grid';
import { SortOrder } from '../../../resource-pool/SortOrder';
import { MUIDataTableColumn } from 'mui-datatables';
import { WithTranslation } from 'react-i18next';
import { mapDispatchToProps, mapStateToProps } from './index';
import EmployeesFilterPanel from '../../components/employees-filter-panel/index';
import { FilterField } from '../../components/employees-filter-panel/employees-filter-panel';
import { Role } from '../../../../commons/role';
import { EmployeeParams } from '../../../../model/parameters/employee-params';

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  WithTranslation;

export class EmployeesPage extends React.Component<Props> {
  private readonly colDefs: MUIDataTableColumn[];
  private readonly gridConfig: Partial<DataGridProps>;

  public constructor(props: Props) {
    super(props);
    this.gridConfig = this.getGridConfig();
    this.colDefs = this.getGridColumnsConfig();
  }

  public componentDidMount(): void {
    this.props.fetch(this.props.params);
  }

  public render(): JSX.Element {
    const { page, params, showFilterPanel } = this.props;
    const sort = {
      sortBy: params.sortBy as string,
      direction: params.order,
    };

    if (!page) {
      return <div />;
    }

    const filter: { [key: string]: FilterValueType } = {};
    if (params.name) {
      filter[FilterField.EMPLOYEE_LAST_NAME] = params.name;
    }
    return (
      <AimDataGrid
        columns={this.colDefs}
        data={page.content.map(this.mapEmployeeRoles)}
        totalPageCount={page.totalElements}
        rowsPerPage={params.pageSize}
        sort={sort}
        filterValues={filter}
        filterPanelOpen={showFilterPanel}
        {...this.gridConfig}
      />
    );
  }

  private getGridConfig(): Partial<DataGridProps> {
    const { t } = this.props;
    const gridConfig: Partial<DataGridProps> = {
      pageTitle: t('employeePage.header'),
      onColumnSortChange: (changedColumn, direction) =>
        this.handleColumnSortChange(changedColumn, direction),
      onChangePage: currentPage => this.handleChangePage(currentPage),
      onChangeRowsPerPage: numberOfRows => this.handleChangeRowsPerPage(numberOfRows),
      onRowClick: (rowData, rowMeta, dataItem) => this.handlerRowClick(rowData, rowMeta, dataItem),
      renderCustomFilterCmp: context => <EmployeesFilterPanel context={context} />,
      onFilterChange: this.handleFilterChange,
      toggleFilterPanel: this.toggleShowFilterPanel,
      customToolbar: () => {
        return (
          <Tooltip title={t('employeePage.buttons.syncToIntranet')}>
            <IconButton onClick={this.handleSync}>
              <Sync />
            </IconButton>
          </Tooltip>
        );
      },
    };

    return gridConfig;
  }

  private toggleShowFilterPanel = (showFilterPanel: boolean) => {
    const { toggleFilterPanel } = this.props;
    toggleFilterPanel(showFilterPanel);
  };

  private getGridColumnsConfig(): MUIDataTableColumn[] {
    const { t } = this.props;
    const colDefs: MUIDataTableColumn[] = [
      {
        label: t('employeePage.grid.columns.id'),
        name: 'id',
      },
      {
        label: t('employeePage.grid.columns.lastName'),
        name: 'lastName',
      },
      {
        label: t('employeePage.grid.columns.firstName'),
        name: 'firstName',
      },
      {
        label: t('employeePage.grid.columns.middleName'),
        name: 'middleName',
      },
      {
        label: t('employeePage.grid.columns.position'),
        name: 'post',
      },
      {
        label: t('employeePage.grid.columns.role'),
        name: 'role',
      },
    ];
    return colDefs;
  }

  private handleColumnSortChange(changedColumn: string, direction: SortOrder) {
    const changeParams: Partial<EmployeeParams> = {
      sortBy: changedColumn as keyof EmployeeFullModel,
      order: direction,
    };
    this.handleChange(changeParams);
  }

  private handleChangePage(currentPage: number) {
    const changeParams: Partial<EmployeeParams> = {
      page: currentPage,
    };
    this.handleChange(changeParams);
  }

  private handleChangeRowsPerPage(numberOfRows: number) {
    const changeParams: Partial<EmployeeParams> = {
      pageSize: numberOfRows,
    };
    this.handleChange(changeParams);
  }

  private handlerRowClick(
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number },
    dataItem: object
  ) {
    this.handleRedirect(dataItem as EmployeeFullModel);
  }

  private handleChange(changeParams?: Partial<EmployeeParams>): void {
    const params: EmployeeParams = Object.assign({}, this.props.params, changeParams);
    this.props.fetch(params);
  }

  private handleFilterChange = (values: { [key: string]: FilterValueType }) => {
    const changeParams: Partial<EmployeeParams> = {
      name: values[FilterField.EMPLOYEE_LAST_NAME]
        ? values[FilterField.EMPLOYEE_LAST_NAME] + ''
        : undefined,
    };
    this.handleChange(changeParams);
  };

  private handleRedirect(item: EmployeeFullModel) {
    const id: string = item.id.toString(10);
    this.props.redirect(Path.EMPLOYEE_CARD.replace(':id', id));
  }

  private handleSync = () => {
    this.props.sync(this.props.params);
  };

  private mapEmployeeRoles = (employee: EmployeeFullModel) => {
    const { t } = this.props;
    const role =
      [Role.POOL_CREATOR, Role.POOL_OWNER].indexOf(employee.role) >= 0 ? Role.USER : employee.role;
    return {
      ...employee,
      role: t('employeeChangeRolePage.' + role),
    };
  };
}
