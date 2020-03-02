import React from 'react';
import moment from 'moment';

export interface WithMinDate {
  minDate: moment.Moment;
}

export const withMinDate = <P extends WithMinDate>(Component: React.ComponentType<P>) =>
  class Wrapped extends React.Component<Pick<P, Exclude<keyof P, keyof WithMinDate>>> {
    public render(): React.ReactNode {
      const minDate = moment();
      return <Component {...(this.props as P)} minDate={minDate} />;
    }
  };

export default withMinDate;
