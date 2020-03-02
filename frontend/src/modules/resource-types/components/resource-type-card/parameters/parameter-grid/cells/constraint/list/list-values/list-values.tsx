import React from 'react';
import { ListValueCreateModel } from '../../../../../../../../../../model/create/list-value-create-model';
import { Style } from './styles';
import ListValueItem from './item';
import { WithTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { DragHandle } from '@material-ui/icons';
import { Props as ItemProps } from './item/list-value-item';
import arrayMove from 'array-move';
import { ListItem } from '@material-ui/core';

export interface Props {
  values?: ListValueCreateModel[];
  onContentChange: (value: string, index: number) => void;
  onRemove: (index: number) => void;
  highlightEmpty?: boolean;
  editable?: boolean;
  changeOrder: (listValues: ListValueCreateModel[]) => void;
}
const ListSortable = SortableContainer(({ children }: { children: React.ReactNode }) => (
  <List dense>{children}</List>
));
const DragHandler = SortableHandle(({ style }: { style?: React.CSSProperties }) => (
  <span style={{ ...style, ...{ cursor: 'move' } }}>
    <DragHandle />
  </span>
));
const Item = SortableElement(({ data }: { data: ItemProps }) => {
  return (
    <ListItem key={data.index} style={{ zIndex: 1300 }}>
      <ListValueItem {...data} />
    </ListItem>
  );
});
export type InternalProps = Props & Style & WithTranslation;

export class ListValues extends React.PureComponent<InternalProps> {
  private onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const { changeOrder, values } = this.props;
    if (!values) {
      return;
    }
    const newValues = arrayMove(values, oldIndex, newIndex).map((row, index) => {
      row.order = index;
      return row;
    });
    changeOrder(newValues);
  };

  public render(): React.ReactNode {
    const { values, editable, onContentChange, onRemove, highlightEmpty } = this.props;

    return (
      <div>
        <ListSortable onSortEnd={this.onSortEnd} useDragHandle>
          {values &&
            values.length !== 0 &&
            values.map((value, index) => (
              <Item
                index={index}
                key={index}
                data={{
                  onChange: onContentChange,
                  onValidationRequested: this.handleValidation,
                  highlightEmpty: highlightEmpty,
                  item: value,
                  index: index,
                  onRemove: onRemove,
                  editable: editable,
                  DragHandler: DragHandler,
                }}
              />
            ))}
        </ListSortable>
      </div>
    );
  }

  private handleValidation = (index: number) => {
    const { values } = this.props;

    if (!values || values[index].content === '') {
      return true;
    }

    return !values.some(
      (value, i) =>
        i !== index &&
        !!value.content &&
        value.content.toLowerCase() === values[index].content.toLowerCase()
    );
  };
}
