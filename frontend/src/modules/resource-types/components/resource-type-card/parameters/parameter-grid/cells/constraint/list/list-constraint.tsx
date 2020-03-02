import React, { ReactNode } from 'react';
import { ListValueCreateModel } from '../../../../../../../../../model/create/list-value-create-model';
import { Button } from '@material-ui/core';
import ListValuesForm from './list-values';
import { WithTranslation } from 'react-i18next';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { Style } from './styles';
import _ from 'underscore';

export interface Props {
  values?: ListValueCreateModel[];
  onContentChange: (value: string, index: number) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  highlightEmpty?: boolean;
  style?: React.CSSProperties;
  className?: string;
  editable?: boolean;
  changeOrder: (listValues: ListValueCreateModel[]) => void;
}

export interface State {
  anchorEl: null | HTMLElement;
  needRefresh: boolean;
}

export type InnerProps = Props & WithTranslation & Style;

export class ListConstraint extends React.PureComponent<InnerProps, State> {
  public constructor(props: InnerProps) {
    super(props);

    this.state = {
      anchorEl: null,
      needRefresh: false,
    };
  }
  public componentWillReceiveProps(): void {
    this.setState({
      needRefresh: false,
    });
  }

  public render(): ReactNode {
    const {
      values,
      onContentChange,
      highlightEmpty,
      editable,
      classes,
      className,
      style,
      t,
      changeOrder,
    } = this.props;
    const { anchorEl, needRefresh } = this.state;
    const isValid = this.validate();
    return (
      <div className={`${className} ${classes.buttonContainer}`} style={style}>
        <Button
          onClick={this.handleOpenMenuClick}
          classes={{
            root: !isValid ? classes.buttonOnError : undefined,
          }}
        >
          {t('common.change')}
        </Button>
        <Menu
          disableAutoFocusItem
          open={!!anchorEl && !needRefresh}
          anchorEl={anchorEl}
          onClose={this.handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 6,
              width: 300,
            },
          }}
        >
          {editable && (
            <IconButton onClick={this.onAdd}>
              <Add />
            </IconButton>
          )}
          <ListValuesForm
            values={values}
            onContentChange={onContentChange}
            onRemove={this.onRemove}
            highlightEmpty={highlightEmpty}
            editable={editable}
            changeOrder={changeOrder}
          />
        </Menu>
      </div>
    );
  }

  private handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  private handleOpenMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  private validate = (): boolean => {
    const { values, highlightEmpty } = this.props;
    if (!values || !values.length) {
      return !highlightEmpty;
    }

    const emptyCheck = !highlightEmpty || !values.some(value => !value.content);

    return (
      emptyCheck &&
      _.uniq(_.map(values, value => value.content.toLowerCase())).length === values.length
    );
  };

  private onAdd = () => {
    const { onAdd } = this.props;
    this.setState(
      {
        needRefresh: true,
      },
      () => onAdd()
    );
  };

  private onRemove = (index: number) => {
    const { onRemove } = this.props;
    this.setState(
      {
        needRefresh: true,
      },
      () => onRemove(index)
    );
  };
}
