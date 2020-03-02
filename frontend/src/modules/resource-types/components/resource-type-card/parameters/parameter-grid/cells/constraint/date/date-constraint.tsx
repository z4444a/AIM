import React from 'react';
import moment from 'moment';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';
import RangeField from '../../../../../../../../../commons/components/range-field/index';
import { DateField } from '../../../../../../../../../commons/components/generic-fields/date-field/date-field';
import { FieldType } from '../../../../../../../../../commons/components/generic-fields/models/field-config.model';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

export interface Props {
  minValue?: Date;
  onMinValueChange: (date?: Date) => void;
  maxValue?: Date;
  onMaxValueChange: (date?: Date) => void;
  minToday?: boolean;
  maxToday?: boolean;
  onMinTodayValueChange: (today?: boolean) => void;
  onMaxTodayValueChange: (today?: boolean) => void;
  style?: React.CSSProperties;
  className?: string;
  editable?: boolean;
}

export type InternalProps = Props & WithTranslation & Style;

export class DateConstraint extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const {
      className,
      classes,
      style,
      minValue,
      maxValue,
      minToday,
      maxToday,
      onMinValueChange,
      onMaxValueChange,
      onMinTodayValueChange,
      onMaxTodayValueChange,
      editable,
      t,
    } = this.props;

    const handleValueChange = (value: Date | undefined, key: string) => {
      if (key === 'min') {
        onMinValueChange(value);
        return;
      }
      if (key === 'max') {
        onMaxValueChange(value);
      }
    };

    const handleMinTodayChange = (event: React.ChangeEvent, checked: boolean) =>
      onMinTodayValueChange(checked);

    const handleMaxTodayChange = (event: React.ChangeEvent, checked: boolean) =>
      onMaxTodayValueChange(checked);

    const maxDateFrom = maxValue
      ? moment(maxValue)
          .subtract(1, 'd')
          .toDate()
      : undefined;

    const minDateTo = minValue
      ? moment(minValue)
          .add(1, 'd')
          .toDate()
      : minToday
      ? new Date()
      : undefined;

    return (
      <div>
        <RangeField
          fieldWidth="100%"
          height={editable ? '30px' : undefined}
          className={className}
          style={style}
        >
          <DateField
            value={minValue}
            today={minToday}
            fieldConfig={{
              fieldType: FieldType.Date,
              disabled: !editable,
              key: 'min',
              required: false,
              constraints: {
                maxDateValue: maxDateFrom,
              },
            }}
            handlers={{
              onValueChange: handleValueChange,
            }}
          />
          <DateField
            value={maxValue}
            today={maxToday}
            fieldConfig={{
              fieldType: FieldType.Date,
              disabled: !editable,
              key: 'max',
              required: false,
              constraints: {
                minDateValue: minDateTo,
              },
            }}
            handlers={{
              onValueChange: handleValueChange,
            }}
          />
        </RangeField>
        <div className={editable ? classes.checkboxes : classes.hidden}>
          <Tooltip title={t('typeCard.constraint.minDateTodayTooltip')}>
            <FormControlLabel
              control={<Checkbox checked={minToday} onChange={handleMinTodayChange} />}
              label={t('typeCard.constraint.dateValueToday')}
            />
          </Tooltip>
          <Tooltip title={t('typeCard.constraint.maxDateTodayTooltip')}>
            <FormControlLabel
              control={<Checkbox checked={maxToday} onChange={handleMaxTodayChange} />}
              label={t('typeCard.constraint.dateValueToday')}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}
