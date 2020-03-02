import FullParameterModel from '../../../../model/get/full-parameter-model';
import { mapDispatchToProps, mapStateToProps } from './index';
import React from 'react';
import AcceptDialog from '../../components/accept-dialog/index';
import { GenericFormValue } from '../../../../commons/components/generic-fields/models/field-config.model';
import NamedModel from '../../../../model/base/named-model';

export interface Props {
  open: boolean;
  close: () => void;
  submit: (poolId: number, values?: GenericFormValue, comment?: string) => void;
  fetchParameters: () => void;
  parameters: FullParameterModel[];
  comment: string;
  updateComment: (content: string) => void;
  resetComment: () => void;
  suggestions: NamedModel[];
}
export type InternalProps = Props &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

export class AcceptDialogValuesHandler extends React.PureComponent<InternalProps> {
  public componentWillUnmount(): void {
    const { resetValues, resetSelectedPool } = this.props;
    resetValues();
    resetSelectedPool();
  }
  public render(): React.ReactNode {
    return <AcceptDialog {...this.props} />;
  }
}
