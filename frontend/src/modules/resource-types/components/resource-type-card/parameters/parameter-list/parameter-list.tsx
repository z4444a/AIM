import React from 'react';
import { WithTranslation } from 'react-i18next';
import { Style } from './styles';
import classNames from 'classnames';
import { ParameterFormModel } from '../../../../../../model/form/parameter-form-model';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ParameterRowFormModel } from '../../../../../../model/form/parameter-row-form-model';
import ParameterGrid from '../parameter-grid/index';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ParameterModifier } from '../../../../../../model/parameter-modifier';
import Tooltip from '@material-ui/core/Tooltip';
import { ResourceTypeSuggestion } from '../../../../../../redux/reducers/request-create-page-reducer';
import { ValidationParameterResponse } from '../../../../../../model/validation-parameter-response';
import { ParameterUniqueFields } from '../../../../../../model/parameters/parameter-unique-fields';

export interface Props {
  className?: string;
  rows: ParameterRowFormModel[];
  highlightEmpty?: boolean;
  onRemoveButtonClick: (index: number) => void;
  onParameterRowModelChange: (index: number, parameter: ParameterFormModel) => void;
  onAddParameterRow: (modifier: ParameterModifier) => void;
  onEditConfirmed: (key: number) => void;
  onEditCanceled: (key: number) => void;
  onRowEditSet: (index: number, expanded: boolean) => void;
  changeOrder: (modifier: ParameterModifier, rows: ParameterRowFormModel[]) => void;

  onShowOverlay: (text: string) => void;
  onHideOverlay: () => void;

  findParamValue?: (id: number) => void;
  resetRemoveParameterResponse?: () => void;

  typeSuggestions: ResourceTypeSuggestion[];
  removedParameterResponse: ValidationParameterResponse | null;

  findParamIdentifier: (params: ParameterUniqueFields) => void;
  identifierValidation: ValidationParameterResponse | null;
  setValidation: (params: ValidationParameterResponse | null) => void;
}

export type InternalProps = Props & WithTranslation & Style;

export class ParameterList extends React.PureComponent<InternalProps> {
  private readonly addMain: () => void;
  private readonly addTechnical: () => void;
  private readonly addAllocationDependant: () => void;

  public constructor(props: InternalProps) {
    super(props);
    this.addMain = this.handleAddParameterRow(ParameterModifier.REQUEST_PARAMETER);
    this.addTechnical = this.handleAddParameterRow(ParameterModifier.POOL_PARAMETER);
    this.addAllocationDependant = this.handleAddParameterRow(
      ParameterModifier.ALLOCATION_PARAMETER
    );
  }

  public render(): React.ReactNode {
    const {
      classes,
      rows,
      onEditCanceled,
      onEditConfirmed,
      className,
      highlightEmpty,
      t,
      changeOrder,
      onRemoveButtonClick,
      onShowOverlay,
      onHideOverlay,

      findParamValue,
      removedParameterResponse,
      resetRemoveParameterResponse,

      typeSuggestions,

      identifierValidation,
      setValidation,
    } = this.props;
    const mainRows = rows.filter(row => row.model.modifier === ParameterModifier.REQUEST_PARAMETER);
    const techRows = rows.filter(row => row.model.modifier === ParameterModifier.POOL_PARAMETER);
    const depRows = rows.filter(
      row => row.model.modifier === ParameterModifier.ALLOCATION_PARAMETER
    );
    return (
      <div className={classNames(className, classes.mainContainer)}>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Tooltip title={t('typeCard.tooltips.tech')}>
              <Typography variant="overline">{t('typeCard.parameters.technical')}</Typography>
            </Tooltip>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
              <Button variant="contained" onClick={this.addTechnical}>
                {t('common.add')}
              </Button>
            </div>
            {techRows.length ? (
              <ParameterGrid
                parametersModifier={ParameterModifier.POOL_PARAMETER}
                onRemove={onRemoveButtonClick}
                highlightEmpty={highlightEmpty}
                rows={techRows}
                onParameterNameValidationRequested={this.handleParameterNameValidation}
                onParamChange={this.handleParameterChange}
                onEditableChange={this.handleEditSet}
                onEditConfirmed={onEditConfirmed}
                onEditCanceled={onEditCanceled}
                changeOrder={(rows: ParameterRowFormModel[]) =>
                  changeOrder(ParameterModifier.POOL_PARAMETER, rows)
                }
                warningDialogHeader={t('typeCard.parameters.warnings.usedByPool')}
                onShowOverlay={onShowOverlay}
                onHideOverlay={onHideOverlay}
                findParamValue={findParamValue}
                removedParameterResponse={removedParameterResponse}
                resetRemoveParameterResponse={resetRemoveParameterResponse}
                typeSuggestions={typeSuggestions}
                findParamIdentifier={this.findIdentifier}
                identifierValidation={identifierValidation}
                resetValidation={() => setValidation(null)}
              />
            ) : (
              <div className={classes.noParamsMessageContainer}>
                <Typography variant="overline" color="secondary">
                  {t('typeCard.parameters.noParamsMessage')}
                </Typography>
              </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Tooltip title={t('typeCard.tooltips.base')}>
              <Typography variant="overline">{t('typeCard.parameters.main')}</Typography>
            </Tooltip>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
              <Button variant="contained" onClick={this.addMain}>
                {t('common.add')}
              </Button>
            </div>
            {mainRows.length ? (
              <ParameterGrid
                parametersModifier={ParameterModifier.REQUEST_PARAMETER}
                onRemove={onRemoveButtonClick}
                highlightEmpty={highlightEmpty}
                rows={mainRows}
                onParamChange={this.handleParameterChange}
                onParameterNameValidationRequested={this.handleParameterNameValidation}
                onEditableChange={this.handleEditSet}
                onEditConfirmed={onEditConfirmed}
                onEditCanceled={onEditCanceled}
                changeOrder={(rows: ParameterRowFormModel[]) =>
                  changeOrder(ParameterModifier.REQUEST_PARAMETER, rows)
                }
                warningDialogHeader={t('typeCard.parameters.warnings.usedByRequest')}
                onShowOverlay={onShowOverlay}
                onHideOverlay={onHideOverlay}
                findParamValue={findParamValue}
                removedParameterResponse={removedParameterResponse}
                resetRemoveParameterResponse={resetRemoveParameterResponse}
                typeSuggestions={typeSuggestions}
                findParamIdentifier={this.findIdentifier}
                identifierValidation={identifierValidation}
                resetValidation={() => setValidation(null)}
              />
            ) : (
              <div className={classes.noParamsMessageContainer}>
                <Typography variant="overline" color="secondary">
                  {t('typeCard.parameters.noParamsMessage')}
                </Typography>
              </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Tooltip title={t('typeCard.tooltips.alloc')}>
              <Typography variant="overline">
                {t('typeCard.parameters.allocationParameters')}
              </Typography>
            </Tooltip>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div>
              <Button variant="contained" onClick={this.addAllocationDependant}>
                {t('common.add')}
              </Button>
            </div>
            {depRows.length ? (
              <ParameterGrid
                parametersModifier={ParameterModifier.ALLOCATION_PARAMETER}
                onRemove={onRemoveButtonClick}
                highlightEmpty={highlightEmpty}
                rows={depRows}
                onParameterNameValidationRequested={this.handleParameterNameValidation}
                onParamChange={this.handleParameterChange}
                onEditableChange={this.handleEditSet}
                onEditConfirmed={onEditConfirmed}
                onEditCanceled={onEditCanceled}
                changeOrder={(rows: ParameterRowFormModel[]) =>
                  changeOrder(ParameterModifier.ALLOCATION_PARAMETER, rows)
                }
                warningDialogHeader={t('typeCard.parameters.warnings.usedForAllocation')}
                onShowOverlay={onShowOverlay}
                onHideOverlay={onHideOverlay}
                findParamValue={findParamValue}
                removedParameterResponse={removedParameterResponse}
                resetRemoveParameterResponse={resetRemoveParameterResponse}
                typeSuggestions={typeSuggestions}
                findParamIdentifier={this.findIdentifier}
                identifierValidation={identifierValidation}
                resetValidation={() => setValidation(null)}
              />
            ) : (
              <div className={classes.noParamsMessageContainer}>
                <Typography variant="overline" color="secondary">
                  {t('typeCard.parameters.noParamsMessage')}
                </Typography>
              </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  private findIdentifier = (params: ParameterUniqueFields) => {
    const { rows, findParamIdentifier, setValidation } = this.props;
    const { identifier, modifier, key } = params;
    if (!identifier || identifier.length === 0) {
      return true;
    }
    const foundLocal = rows.some(
      row =>
        row.key !== key && row.model.identifier === identifier && row.model.modifier === modifier
    );
    if (foundLocal) {
      const result: ValidationParameterResponse = {
        id: key,
        validationPassed: false,
      };
      setValidation(result);
      return;
    }
    findParamIdentifier(params);
  };

  private handleParameterNameValidation = (name: string, key: number) => {
    const { rows } = this.props;

    if (!name || name === '') {
      return true;
    }

    return !rows.some(
      row => row.key !== key && row.model.name.toLowerCase() === name.toLowerCase()
    );
  };

  private handleParameterChange = (parameter: ParameterFormModel, key: number) => {
    const { onParameterRowModelChange } = this.props;
    onParameterRowModelChange(key, parameter);
  };

  private handleEditSet = (editable: boolean, key: number) => {
    const { onRowEditSet } = this.props;
    onRowEditSet(key, editable);
  };

  private handleAddParameterRow = (modifier: ParameterModifier) => () => {
    const { onAddParameterRow } = this.props;
    onAddParameterRow(modifier);
  };
}
