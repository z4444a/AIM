import React, { ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ListFieldConfigModel,
  ListFieldHandlers,
  ListFieldValue,
} from '../models/field-config.model';
import AimMultipleSelect from '../../aim-multiple-select/index';
import NamedModel from '../../../../model/base/named-model';
import { ItemSelection } from '../../aim-multiple-select/aim-multiple-select';
import _ from 'underscore';

export interface Props {
  fieldConfig: ListFieldConfigModel;
  handlers: ListFieldHandlers;
  value?: ListFieldValue;
  values?: ListFieldValue[];
}

export type InternalProps = Props;

export class ListField extends React.PureComponent<InternalProps, ItemSelection> {
  private readonly emptyValue = '';

  constructor(props: InternalProps) {
    super(props);
    this.state = ListField.getSelection(
      props.fieldConfig.optionList,
      props.values ? props.values.map(item => item.toString()) : []
    );
  }

  componentDidUpdate(prevProps: Readonly<InternalProps>, prevState: Readonly<ItemSelection>): void {
    const { values, fieldConfig } = this.props;
    if (
      !_.isEqual(values, prevProps.values) ||
      !_.isEqual(fieldConfig.optionList, prevProps.fieldConfig.optionList)
    ) {
      this.setState(
        ListField.getSelection(
          fieldConfig.optionList,
          values ? values.map(item => item.toString()) : []
        )
      );
    }
  }

  public render(): ReactNode {
    const { fieldConfig, value } = this.props;
    const {
      className,
      style,
      required,
      key,
      optionList,
      labelConfig,
      error,
      multipleMax,
    } = fieldConfig;
    const multiple = multipleMax && multipleMax > 1;
    const { available, selected } = this.state;
    return multiple ? (
      <AimMultipleSelect
        disabled={selected.length === multipleMax || available.length === 0}
        available={available}
        selected={selected}
        selectItems={this.selectItems}
        label={labelConfig && labelConfig.visible ? labelConfig.value : ''}
        error={!!error}
      />
    ) : (
      <TextField
        select
        style={style}
        className={className}
        required={required}
        error={!!error}
        helperText={error ? error.value : undefined}
        value={value ? value : this.emptyValue}
        onChange={this.handleValueChange}
        label={labelConfig && labelConfig.visible ? labelConfig.value : undefined}
      >
        {Object.keys(optionList).map(itemKey => (
          <MenuItem key={`${key}_${itemKey}`} value={itemKey}>
            {optionList[itemKey]}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  private static getSelection = (
    options: { [key: string]: string },
    values: ListFieldValue[]
  ): ItemSelection => {
    const indexList = Object.keys(options);
    return {
      available: indexList
        .filter(item => values.indexOf(item) < 0)
        .map(item => ListField.toNamed(options, item)),
      selected: indexList
        .filter(item => values.indexOf(item) >= 0)
        .map(item => ListField.toNamed(options, item)),
    };
  };

  private static toNamed = (options: { [key: string]: string }, value: string): NamedModel => {
    return {
      id: parseInt(value),
      name: options[value],
    };
  };

  private selectItems = (selection: ItemSelection) => {
    this.setState(selection);
    const { handlers, fieldConfig } = this.props;
    if (!handlers || typeof handlers.onValuesChange !== 'function') {
      return;
    }
    handlers.onValuesChange(selection.selected.map(item => item.id.toString()), fieldConfig.key);
  };

  private handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { handlers, fieldConfig } = this.props;
    if (!handlers || typeof handlers.onValueChange !== 'function') {
      return;
    }
    handlers.onValueChange(event.target.value, fieldConfig.key);
  };
}
