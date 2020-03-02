import React, { ReactNode } from 'react';
import Spinner from '../../../../commons/components/spinner/spinner';
import RegistrationPage from '../../../registration/features/registration-page/index';
import LoginPage from '../../../login/features/login-page/index';
import { mapDispatchToProps, mapStateToProps } from './index';
import { Style } from './styles';
import { WithTranslation } from 'react-i18next';

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  Style &
  WithTranslation;

export class GuestPage extends React.PureComponent<Props> {
  public componentDidMount() {
    const { checkIsFirstUserExist, firstUserExists } = this.props;
    if (firstUserExists == null) {
      checkIsFirstUserExist();
    }
  }

  public render(): ReactNode {
    const { classes, firstUserExists, checkingExistenceOfFirstUser, t } = this.props;
    if (checkingExistenceOfFirstUser) {
      return (
        <div className={classes.container}>
          <div className={classes.spinnerContainer}>
            <Spinner />
            <div>{t('common.loading')}</div>
          </div>
        </div>
      );
    }
    if (!firstUserExists) {
      return <RegistrationPage />;
    }
    return <LoginPage />;
  }
}
