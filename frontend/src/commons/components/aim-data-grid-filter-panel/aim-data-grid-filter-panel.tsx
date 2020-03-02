import React, { ReactNode } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { WithTranslation } from 'react-i18next';
import { CustomFilterCmpContext, FilterValueType } from '../aim-data-grid/aim-data-grid';
import { Style } from './styles';

export interface State {
  filterValues: { [key: string]: FilterValueType };
}

export interface Props {
  open?: boolean;
  onClearFilters?: () => void;
  onApplyFilters?: (filterValues: { [key: string]: FilterValueType }) => void;
  renderCustomFilterCmp?: (context: CustomFilterCmpContext) => ReactNode;
  filterValues?: { [key: string]: FilterValueType };
}

export type InternalProps = Props & WithTranslation & Style;

export class AimDataGridFilterPanel extends React.PureComponent<InternalProps, State> {
  private readonly customFilterCmpContext: CustomFilterCmpContext;

  public constructor(props: InternalProps) {
    super(props);
    this.customFilterCmpContext = this.initCustomFilterCmpContext();
    this.state = { filterValues: {} };
  }

  public componentWillReceiveProps(nextProps: InternalProps) {
    this.setState({ filterValues: Object.assign({}, nextProps.filterValues) });
  }

  public render(): ReactNode {
    const { open, renderCustomFilterCmp, t, classes } = this.props;
    const { filterValues } = this.state;
    return (
      open && (
        <div className={classes.container}>
          <DialogTitle>{t('aimDataGrid.filterPanel.header')}</DialogTitle>
          <DialogContent>
            {typeof renderCustomFilterCmp === 'function' &&
              renderCustomFilterCmp({
                changeFilters: this.customFilterCmpContext.changeFilters,
                applyFilters: this.customFilterCmpContext.applyFilters,
                values: filterValues,
              })}
          </DialogContent>
          <DialogActions>
            <Button id="dataGridFilterPanelClearFiltersBtn" onClick={this.handleClearFilters}>
              {t('aimDataGrid.filterPanel.clearFiltersBtn')}
            </Button>
            <Button id="dataGridFilterPanelApplyFiltersBtn" onClick={this.handleApplyFilters}>
              {t('aimDataGrid.filterPanel.applyFiltersBtn')}
            </Button>
          </DialogActions>
        </div>
      )
    );
  }

  private initCustomFilterCmpContext(): CustomFilterCmpContext {
    const ctx: CustomFilterCmpContext = {
      changeFilters: values => {
        this.setState({ filterValues: values });
      },
      applyFilters: this.handleApplyFilters,
    };
    return ctx;
  }

  private handleClearFilters = () => {
    const { onClearFilters } = this.props;
    if (onClearFilters && typeof onClearFilters === 'function') {
      onClearFilters();
    }
  };

  private handleApplyFilters = () => {
    const { onApplyFilters } = this.props;
    const { filterValues } = this.state;
    if (onApplyFilters && typeof onApplyFilters === 'function') {
      onApplyFilters(filterValues);
    }
  };
}
