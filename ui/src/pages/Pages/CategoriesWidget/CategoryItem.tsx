import React, {useRef} from 'react';
import type {Identifier, XYCoord} from 'dnd-core';
import {useDrag, useDrop} from 'react-dnd';

export const ItemTypes = {
  CARD: 'card',
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number, item: any) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// interface DragItem {
//   index: number;
//   id: string;
//   type: string;
//   derp: string; // seeing if this breaks anything
// }
export const CategoryItem: React.FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
}) => {
  // const ref = useRef<HTMLDivElement>(null);
  // const [, drop] = useDrop({
  //   // accept: ItemTypes.CARD,
  //   accept: 'ItemTypes',
  //   hover(item: any, monitor: DropTargetMonitor) {
  //     // console.log('hover: ', item.derp);
  //     if (!ref.current) {
  //       console.log('not');
  //       return;
  //     }
  //     console.log('monitor', monitor);
  //     // if(monitor.canDrop()) {
  //     //   console.log('useDrag hover CAN DROP')
  //     // }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     // // Determine rectangle on screen
  //     // const hoverBoundingRect = ref.current?.getBoundingClientRect()

  //     // // Get vertical middle
  //     // const hoverMiddleY =
  //     //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

  //     // // Determine mouse position
  //     // const clientOffset = monitor.getClientOffset()

  //     // // Get pixels to the top
  //     // const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

  //     // // Only perform the move when the mouse has crossed half of the items height
  //     // // When dragging downwards, only move when the cursor is below 50%
  //     // // When dragging upwards, only move when the cursor is above 50%

  //     // // Dragging downwards
  //     // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //     //   return
  //     // }

  //     // // Dragging upwards
  //     // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //     //   return
  //     // }

  //     // Time to actually perform the action
  //     moveCard(dragIndex, hoverIndex);

  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  //   drop(item, monitor) {
  //     console.log('DROP: ', item);
  //     console.log('DROP: ', monitor.canDrop());
  //   },
  // });

  // const [collected, drag, dragPreview] = useDrag({
  //   type: 'image',
  //   item: () => ({id, index}),
  //   collect: (monitor: any) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // drag(drop(ref));

  // const [collected, drag, preview] = useDrag(
  //   () => ({
  //     type: 'category',
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //   }),
  //   [],
  // );

  const ref = useRef<HTMLDivElement>(null);
  const [{handlerId}, drop] = useDrop<
    DragItem,
    void,
    {handlerId: Identifier | null}
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, item);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({id, index}),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{...style, opacity}} data-handler-id={handlerId}>
      {text}
    </div>
  );
};
