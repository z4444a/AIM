import React, { ReactNode } from 'react';
import 'load-awesome/css/ball-clip-rotate-multiple.css';

export class Spinner extends React.PureComponent {
  public render(): ReactNode {
    return (
      <div className="la-ball-clip-rotate-multiple la-dark la-2x">
        <div />
        <div />
      </div>
    );
  }
}

export default Spinner;
