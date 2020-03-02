import React, { ReactNode } from 'react';
import RequestCreateForm from '../../components/request-create-form/index';
import { mapDispatchToProps, mapStateToProps } from './index';
import { SuggestionItem } from '../../../../commons/components/aim-autocomplete/aim-autocomplete';
import { Style } from './styles';
import { CreateRequestFormModel } from '../../components/request-create-form/request-create-form';
import { CreateRequestDto } from '../../../../model/create/create-request-dto';
import { Redirect } from 'react-router';
import { Path } from '../../../../commons/path';
import { RequestCreationStatus } from '../../../../redux/reducers/request-create-page-reducer';
import { WithSnackbarProps } from 'notistack';
import { WithTranslation } from 'react-i18next';
import moment from 'moment';
import { ParameterValueCreateModel } from '../../../../model/create/parameter-value-create-model';
import PanelWrapper from '../../../../commons/components/panel-wrapper/index';
import { ParameterValueMapper } from '../../../../commons/services/parameter-value-mapper';

export interface Props {}

export type InternalProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithSnackbarProps &
  WithTranslation;
export interface State {
  needRedirect: boolean;
}
export class RequestCreatePage extends React.PureComponent<InternalProps, State> {
  public constructor(props: InternalProps) {
    super(props);
    this.state = {
      needRedirect: false,
    };

    this.addCurrentUserAsDefaultOwner(props);
  }

  public componentDidMount(): void {
    const {
      fetchResourceTypesSuggestions,
      fetchProjectSuggestions,
      fetchAuthorSuggestions,
    } = this.props;
    fetchResourceTypesSuggestions();
    fetchAuthorSuggestions();
    fetchProjectSuggestions();
  }

  public componentWillUnmount(): void {
    const {
      resetResourceTypeParameters,
      resetRequestCreationStatus,
      resetRequestCreationFormModel,
      hideOverlay,
      setQuantitative,
    } = this.props;
    resetRequestCreationStatus();
    resetRequestCreationFormModel();
    resetResourceTypeParameters();
    hideOverlay();
    setQuantitative(false);
  }

  //TODO Вместо всех этих статусов лучше диспачтить из саги действия на показ/скрытие оверлея и снекбаров.
  public componentWillReceiveProps(nextProps: InternalProps): void {
    const curStatus = this.props.requestCreationStatus;
    const newStatus = nextProps.requestCreationStatus;
    if (curStatus === newStatus) {
      return;
    }
    switch (newStatus) {
      case RequestCreationStatus.CreationError:
        this.handleRequestCreationError();
        break;
      case RequestCreationStatus.SuccessfullyCreated:
        this.handleRequestSuccessfullyCreated();
        this.handleOnClose();
        break;
      case RequestCreationStatus.ProcessedOnServer:
        this.handleProcessedOnServer();
    }
  }

  public render(): ReactNode {
    const { resourceTypeParametersList, classes, formModel, quantitative, user } = this.props;
    if (this.state.needRedirect) {
      return <Redirect to={{ pathname: Path.REQUESTS }} />;
    }
    return (
      <PanelWrapper>
        <div className={classes.container}>
          <RequestCreateForm
            role={user ? user.role : undefined}
            formModel={formModel}
            onSubmit={this.handleOnFormSubmit}
            onClose={this.handleOnClose}
            onFormModelChanged={this.handleOnFormModelChanged}
            getResourceTypeSuggestions={this.getResourceTypeSuggestions}
            getAuthorSuggestions={this.getAuthorSuggestions}
            onResourceTypeSelected={this.handleResourceTypeSelected}
            resourceTypeParameters={resourceTypeParametersList}
            quantitative={quantitative}
            getProjectSuggestions={this.getProjectSuggestions}
            setAmount={this.setAmount}
          />
        </div>
      </PanelWrapper>
    );
  }

  private handleRequestSuccessfullyCreated() {
    const { enqueueSnackbar, t, hideOverlay } = this.props;
    hideOverlay();
    enqueueSnackbar(t('requestPage.messages.successfullyCreated'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  private handleRequestCreationError() {
    const { enqueueSnackbar, t, hideOverlay } = this.props;
    hideOverlay();
    enqueueSnackbar(t('requestPage.messages.creationError'), {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  }

  private addCurrentUserAsDefaultOwner(props: InternalProps) {
    const { user, formModel, updateFormModel } = props;
    if (!user) {
      return;
    }
    const newForm: CreateRequestFormModel = Object.assign({}, formModel);
    newForm.author = {
      id: user.id,
      name: user.fullName,
    };
    updateFormModel(newForm);
  }

  private handleProcessedOnServer() {
    const { showOverlay, t } = this.props;
    showOverlay(t('requestPage.messages.processedOnServer'));
  }

  private getResourceTypeSuggestions = (value: string) => {
    const { resourceTypeSuggestionList } = this.props;
    const result: SuggestionItem[] =
      !resourceTypeSuggestionList || resourceTypeSuggestionList.length === 0
        ? []
        : resourceTypeSuggestionList.map(item => {
            const suggestionItem: SuggestionItem = {
              value: item.name,
              key: item.id,
            };
            return suggestionItem;
          });
    return result.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };
  private getAuthorSuggestions = (value: string) => {
    const { authorSuggestionList } = this.props;
    const result: SuggestionItem[] =
      !authorSuggestionList || authorSuggestionList.length === 0
        ? []
        : authorSuggestionList.map(item => {
            const suggestionItem: SuggestionItem = {
              value: item.name,
              key: item.id.toString(),
            };
            return suggestionItem;
          });
    return result.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };
  private getProjectSuggestions = (value: string) => {
    const { projectSuggestionList } = this.props;
    const result: SuggestionItem[] =
      !projectSuggestionList || projectSuggestionList.length === 0
        ? []
        : projectSuggestionList.map(item => {
            const suggestionItem: SuggestionItem = {
              value: item.name,
              key: item.id.toString(),
            };
            return suggestionItem;
          });
    return result.filter(item =>
      item.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
  };
  private handleOnFormModelChanged = (value: CreateRequestFormModel) => {
    const { updateFormModel } = this.props;
    updateFormModel(value);
  };
  private handleOnClose = () => {
    this.setState({
      needRedirect: true,
    });
  };

  private handleResourceTypeSelected = (value: SuggestionItem) => {
    const {
      resetResourceTypeParameters,
      setResourceTypeParameters,
      resourceTypeSuggestionList,
      setQuantitative,
    } = this.props;
    if (value && value.key) {
      const params = resourceTypeSuggestionList.find(item => item.id === value.key);
      setResourceTypeParameters(params ? params.parameters : []);
      setQuantitative(params ? params.quantitative : false);
    } else {
      resetResourceTypeParameters();
    }
  };

  private setAmount = (form: CreateRequestFormModel, id: string) => {
    const params = this.props.resourceTypeSuggestionList.find(item => item.id === id);
    if (params && params.quantitative) {
      form.amount = 1;
      this.props.updateFormModel(form);
    } else {
      form.amount = 0;
      this.props.updateFormModel(form);
    }
  };

  private handleOnFormSubmit = (value: CreateRequestFormModel) => {
    const { createNewRequest, resourceTypeParametersList } = this.props;
    if (
      !value ||
      !value.endDate ||
      !value.startDate ||
      !value.resourceTypeId ||
      !value.name ||
      !value.author
    ) {
      throw new Error('required parameters are not filled');
    }
    const amount = value.amount ? value.amount : 0;
    const usageStart = moment(value.startDate).format('YYYY-MM-DD');
    const usageFinish = moment(value.endDate).format('YYYY-MM-DD');
    const genericValue = value.resourceTypeParams ? value.resourceTypeParams : {};
    const resourceTypeParams: ParameterValueCreateModel[] = ParameterValueMapper.mapToParameterValues(
      genericValue,
      resourceTypeParametersList,
      []
    );
    const dto: CreateRequestDto = {
      description: value.name,
      typeId: +value.resourceTypeId,
      authorId: value.author.id,
      projectId: value.projectId ? +value.projectId : undefined,
      usageStart,
      usageFinish,
      resourceTypeParams,
      amount,
    };
    createNewRequest(dto);
  };
}
