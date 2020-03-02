import React from 'react';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import NumberField from '../../../../../../../../../commons/components/generic-fields/number-field/index';
import { FieldType } from '../../../../../../../../../commons/components/generic-fields/models/field-config.model';
import { Button } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export interface Props {
  maxValue?: number;
  regExp?: string;
  onRegExpChange: (regex?: string) => void;
  onMaxValueChange: (value?: number) => void;
  editable?: boolean;
}

export interface State {
  anchorEl: null | HTMLElement;
  showLengthInput: null | boolean;
}

export type InternalProps = Props & WithTranslation & Style;

export class TextConstraint extends React.PureComponent<InternalProps, State> {
  constructor(props: InternalProps) {
    super(props);
    const { maxValue, regExp } = this.props;
    this.state = {
      anchorEl: null,
      showLengthInput: !maxValue && !regExp ? null : !!maxValue,
    };
  }

  public render(): React.ReactNode {
    const { classes, maxValue, editable, t, regExp, onRegExpChange } = this.props;
    const { anchorEl, showLengthInput } = this.state;
    if (!editable && showLengthInput !== null) {
      if (showLengthInput) {
        return (
          <div className={classes.readonlyField}>
            {t('typeCard.constraint.maxStringLengthLabel')} - {maxValue ? maxValue : null}
          </div>
        );
      }
      return (
        <div className={classes.readonlyField}>
          {t('typeCard.constraint.regExp')} - {regExp ? regExp : null}
        </div>
      );
    }
    return (
      <div>
        {showLengthInput === null ? (
          <div>
            <div className={classes.buttonContainer}>
              <Button onClick={this.openMenu} disabled={!editable}>
                {t('common.choose')}
              </Button>
            </div>
            <Popper open={anchorEl !== null} anchorEl={anchorEl} transition>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => this.showLengthInput(null)}>
                      <MenuList>
                        <MenuItem onClick={() => this.showLengthInput(true)}>
                          {t('typeCard.constraint.maxStringLengthLabel')}
                        </MenuItem>
                        <MenuItem onClick={() => this.showLengthInput(false)}>
                          {t('typeCard.constraint.regExp')}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        ) : (
          <div className={classes.inputField}>
            {showLengthInput ? (
              <NumberField
                value={maxValue}
                fieldConfig={{
                  fullWidth: true,
                  disabled: !editable,
                  fieldType: FieldType.Number,
                  key: 'max',
                  required: false,
                  labelConfig: {
                    visible: true,
                    value: t('typeCard.constraint.maxStringLengthLabel'),
                  },
                  InputProps: {
                    endAdornment: this.deleteCurrentConstraintButton(),
                  },
                }}
                handlers={{
                  onValueChange: this.handleValueChange,
                }}
              />
            ) : (
              <TextField
                label={t('typeCard.constraint.regExp')}
                value={regExp || ''}
                onChange={event => onRegExpChange(event.target.value)}
                disabled={!editable}
                InputProps={{
                  endAdornment: this.deleteCurrentConstraintButton(),
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
  private deleteCurrentConstraintButton = () => {
    const { classes, editable } = this.props;
    return (
      <InputAdornment position="end">
        <IconButton
          className={classes.internalButton}
          onClick={() => this.showLengthInput(null)}
          disabled={!editable}
        >
          <CloseIcon />
        </IconButton>
      </InputAdornment>
    );
  };

  private openMenu = (event: React.MouseEvent<EventTarget>) => {
    this.setState({
      anchorEl: event.target as HTMLElement,
    });
  };
  private showLengthInput = (show: null | boolean) => {
    const { onRegExpChange, onMaxValueChange } = this.props;
    this.setState({
      anchorEl: null,
      showLengthInput: show,
    });
    onRegExpChange(undefined);
    onMaxValueChange(undefined);
  };

  private handleValueChange = (value: number | undefined, key: string) => {
    this.props.onMaxValueChange(value);
  };
}
