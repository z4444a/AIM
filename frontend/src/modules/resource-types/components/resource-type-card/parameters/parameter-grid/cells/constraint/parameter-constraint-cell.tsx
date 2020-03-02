import React from 'react';
import { ParameterConstraintFormModel } from '../../../../../../../../model/form/parameter-constraint-form-model';
import { WithTranslation } from 'react-i18next';
import { ParameterType } from '../../../../../../../../model/parameter-type';
import _ from 'underscore';
import { ListValueCreateModel } from '../../../../../../../../model/create/list-value-create-model';
import NumberConstraint from './number/index';
import DateConstraint from './date/index';
import TextConstraint from './text/index';
import RealConstraint from './real/index';
import ListConstraint from './list/index';
import { ListValueFormModel } from '../../../../../../../../model/form/list-value-form-model';
import { ResourceTypeSuggestion } from '../../../../../../../../redux/reducers/request-create-page-reducer';
import PoolConstraint from './pool/index';

export interface Props {
  value: ParameterConstraintFormModel;
  type: ParameterType;
  editable: boolean;
  onChange: (value: ParameterConstraintFormModel) => void;
  style?: React.CSSProperties;
  highlightEmpty?: boolean;
  className?: string;
  typeSuggestions: ResourceTypeSuggestion[];
  onSetPoolTypeId: (id: number) => void;
  poolTypeId?: number;
}

export type InnerProps = Props & WithTranslation;

export class ParameterConstraintCell extends React.PureComponent<InnerProps> {
  public render(): React.ReactNode {
    const {
      value,
      type,
      style,
      className,
      editable,
      highlightEmpty,
      typeSuggestions,
      onSetPoolTypeId,
      poolTypeId,
    } = this.props;
    const {
      minNumberValue,
      maxNumberValue,
      minDateToday,
      maxDateToday,
      minDateValue,
      maxDateValue,
      maxStringLength,
      minRealValue,
      maxRealValue,
      listValues,
      regExp,
    } = value;
    switch (type) {
      case ParameterType.LIST:
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ListConstraint
              values={listValues}
              onContentChange={this.handleListValueContentChange}
              onAdd={this.handleAddListValue}
              onRemove={this.handleRemoveListValue}
              changeOrder={this.handleSortListValue}
              style={style}
              highlightEmpty={highlightEmpty}
              className={className}
              editable={editable}
            />
          </div>
        );
      case ParameterType.DATE:
        return (
          <DateConstraint
            minValue={minDateValue}
            maxValue={maxDateValue}
            minToday={minDateToday}
            maxToday={maxDateToday}
            onMinValueChange={this.handleDateConstraintChange('min')}
            onMaxValueChange={this.handleDateConstraintChange('max')}
            onMaxTodayValueChange={this.handleDateTodayConstraintChange('max')}
            onMinTodayValueChange={this.handleDateTodayConstraintChange('min')}
            style={style}
            className={className}
            editable={editable}
          />
        );
      case ParameterType.NUMBER:
        return (
          <NumberConstraint
            minValue={minNumberValue}
            maxValue={maxNumberValue}
            onMinValueChange={this.handleNumberConstraintChange('min')}
            onMaxValueChange={this.handleNumberConstraintChange('max')}
            style={style}
            className={className}
            editable={editable}
          />
        );
      case ParameterType.TEXT:
        return (
          <TextConstraint
            maxValue={maxStringLength}
            regExp={regExp}
            onRegExpChange={this.handleRegExpChange}
            onMaxValueChange={this.handleTextConstraintChange}
            editable={editable}
          />
        );
      case ParameterType.REAL:
        return (
          <RealConstraint
            minValue={minRealValue}
            onMinValueChange={this.handleRealNumberConstraintChange('min')}
            maxValue={maxRealValue}
            onMaxValueChange={this.handleRealNumberConstraintChange('max')}
            style={style}
            className={className}
            editable={editable}
          />
        );
      case ParameterType.POOL:
        return (
          <PoolConstraint
            onTypeSelected={onSetPoolTypeId}
            typeSuggestions={typeSuggestions}
            selectedTypeId={poolTypeId}
            editable={editable}
          />
        );
      default:
        return null;
    }
  }

  private handleRegExpChange = (regex?: string) => {
    const { onChange } = this.props;
    const newConstraint: ParameterConstraintFormModel = {
      regExp: regex,
    };
    onChange(newConstraint);
  };
  private handleListValueContentChange = (content: string, index: number) => {
    const { value, onChange } = this.props;
    const { listValues } = value;

    if (!listValues) {
      return;
    }

    const newListValues = _.map(listValues, _.clone);
    newListValues[index].content = content;

    const newConstraint = {
      listValues: newListValues,
    };

    onChange(newConstraint);
  };

  private handleAddListValue = () => {
    const { value, onChange } = this.props;
    const { listValues } = value;

    const newListValue: ListValueCreateModel = {
      content: '',
      order: listValues ? listValues.length : 0,
    };

    const newConstraint = {
      listValues: listValues ? [...listValues, newListValue] : [newListValue],
    };

    onChange(newConstraint);
  };

  private handleRemoveListValue = (key: string | number) => {
    const { value, onChange } = this.props;
    const { listValues } = value;

    if (!listValues) {
      return;
    }

    let newListValues = _.map(listValues, _.clone);
    const refreshOrder = (item: ListValueFormModel, index: number): ListValueFormModel => {
      return {
        content: item.content,
        order: index,
      };
    };
    newListValues = newListValues.filter((value, i) => i !== key);
    newListValues = newListValues.sort((a, b) => a.order - b.order).map(refreshOrder);
    const newConstraint = {
      listValues: newListValues,
    };

    onChange(newConstraint);
  };

  private handleSortListValue = (listValues: ListValueCreateModel[]) => {
    const { onChange } = this.props;
    const newConstraint = {
      listValues: listValues,
    };
    onChange(newConstraint);
  };

  private handleDateConstraintChange = (type: 'min' | 'max') => (date?: Date) => {
    const { value, onChange } = this.props;
    const { minDateValue, maxDateValue, minDateToday, maxDateToday } = value;

    let minDate = minDateValue;
    let maxDate = maxDateValue;
    switch (type) {
      case 'max':
        maxDate = date;
        break;
      case 'min':
        minDate = date;
        break;
    }
    const newConstraint = {
      minDateValue: minDate,
      maxDateValue: maxDate,
      minDateToday: minDateToday ? minDateToday : false,
      maxDateToday: maxDateToday ? maxDateToday : false,
    };

    onChange(newConstraint);
  };

  private handleDateTodayConstraintChange = (type: 'min' | 'max') => (today?: boolean) => {
    const { value, onChange } = this.props;
    const { minDateToday, maxDateToday, minDateValue, maxDateValue } = value;

    let minDate = minDateToday;
    let maxDate = maxDateToday;
    switch (type) {
      case 'max':
        maxDate = today;
        break;
      case 'min':
        minDate = today;
        break;
    }
    const newConstraint = {
      minDateToday: minDate,
      minDateValue: minDate ? undefined : minDateValue,
      maxDateValue: maxDate ? undefined : maxDateValue,
      maxDateToday: maxDate,
    };

    onChange(newConstraint);
  };

  private handleNumberConstraintChange = (type: 'min' | 'max') => (number?: number) => {
    const { value, onChange } = this.props;
    const { minNumberValue, maxNumberValue } = value;

    let minNumber = minNumberValue;
    let maxNumber = maxNumberValue;

    switch (type) {
      case 'min':
        minNumber = number;
        break;
      case 'max':
        maxNumber = number;
        break;
    }
    const newConstraint = {
      minNumberValue: minNumber,
      maxNumberValue: maxNumber,
    };

    onChange(newConstraint);
  };

  private handleRealNumberConstraintChange = (type: 'min' | 'max') => (number?: number) => {
    const { value, onChange } = this.props;
    const { minRealValue, maxRealValue } = value;

    let minNumber = minRealValue;
    let maxNumber = maxRealValue;

    switch (type) {
      case 'min':
        minNumber = number;
        break;
      case 'max':
        maxNumber = number;
        break;
    }
    const newConstraint = {
      minRealValue: minNumber,
      maxRealValue: maxNumber,
    };

    onChange(newConstraint);
  };

  private handleTextConstraintChange = (length?: number) => {
    const { onChange } = this.props;

    const newConstraint = {
      maxStringLength: length,
    };

    onChange(newConstraint);
  };
}
