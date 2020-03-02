import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { WithTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import { Styles } from './styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { ErrorState } from '../card';

export interface Props {
  errors: ErrorState;
  imgBytes: number[];
  imgSource: string;
  name: string;
  uniqueName: boolean;
  description: string;
  active: boolean;
  quantitative: boolean;
  backup: boolean;

  onImgByteCodeChange: (bytes: number[]) => void;
  onImgSourceChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onNameChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onActiveChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onBackupChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onQuantitativeChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  highlightEmpty: boolean;
}

export type InternalProps = Props & WithTranslation & Styles;
export class TypeFields extends React.PureComponent<InternalProps> {
  public render(): React.ReactNode {
    const {
      classes,
      imgSource,
      name,
      uniqueName,
      description,
      active,
      backup,
      quantitative,
      onImgSourceChange,
      onNameChange,
      onDescriptionChange,
      onActiveChange,
      onBackupChange,
      onQuantitativeChange,
      highlightEmpty,
      t,
      errors,
    } = this.props;
    const src = this.getImageInBase64();
    return (
      <div className={classes.mainContainer}>
        <div className={classes.imgContainer}>
          <Avatar src={src} className={classes.avatar} />
          <TextField
            fullWidth
            value={imgSource || ''}
            onChange={onImgSourceChange}
            label={t('typeCard.fields.icon.label')}
            error={errors && !!errors.picture}
            helperText={errors && errors.picture}
          />
          <input
            accept="*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            multiple
            onChange={e => this.upload(e.target.files)}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              {t('common.upload')}
            </Button>
          </label>
        </div>
        <div>
          <TextField
            fullWidth
            required
            error={!uniqueName || (highlightEmpty && !name.length)}
            helperText={!uniqueName ? t('typeCard.error.uniqueTypeName') : undefined}
            label={t('typeCard.fields.nameLabel')}
            value={name || ''}
            onChange={onNameChange}
          />
        </div>
        <div>
          <div className={classes.checkbox}>
            <Tooltip title={t(`typeCard.tooltips.active.${active}`)}>
              <FormControlLabel
                control={<Checkbox checked={active || false} onChange={onActiveChange} />}
                label={t('typeCard.fields.activeLabel')}
              />
            </Tooltip>
          </div>
          <div className={classes.checkbox}>
            <FormControlLabel
              control={<Checkbox checked={backup || false} onChange={onBackupChange} />}
              label={t('typeCard.fields.backupLabel')}
            />
          </div>
          <div className={classes.checkbox}>
            <Tooltip title={t(`typeCard.tooltips.quantitative.${quantitative}`)}>
              <FormControlLabel
                control={
                  <Checkbox checked={quantitative || false} onChange={onQuantitativeChange} />
                }
                label={t('typeCard.fields.quantitativeLabel')}
              />
            </Tooltip>
          </div>
        </div>
        <div>
          <TextField
            fullWidth
            label={t('typeCard.fields.descriptionLabel')}
            value={description || ''}
            onChange={onDescriptionChange}
            rows={6}
            multiline
          />
        </div>
      </div>
    );
  }

  private getImageInBase64 = () => {
    const { imgSource, imgBytes } = this.props;
    if (imgSource || (imgBytes && imgBytes.length === 0)) {
      return imgSource;
    }
    const image: string =
      typeof imgBytes === 'string'
        ? imgBytes
        : btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(imgBytes))));
    return image.length === 0 ? image : 'data:image/png;base64,' + image;
  };
  private upload = (files: FileList | null) => {
    const { onImgByteCodeChange } = this.props;
    if (files === null || files.length !== 1) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function() {
      const arrayBuffer = reader.result;
      if (typeof arrayBuffer === 'string' || arrayBuffer === null) {
        return;
      }
      const bytes = new Int8Array(arrayBuffer);
      onImgByteCodeChange(Array.from(bytes));
    };
    reader.readAsArrayBuffer(file);
  };
}
