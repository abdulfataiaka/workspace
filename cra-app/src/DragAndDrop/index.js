/*
https://www.npmjs.com/package/react-beautiful-dnd

What is seen on the UI is based on the state of items only, hence the reorder function

Responders
*  onBeforeDragStart
*  onDragStart
*  onDragUpdate
*  onDragEnd

*/
import { useState } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

const initItems = (name) => Array(2).fill(1).map((value, index) => ({
  id: `${name}-${value + index}`,
  text: `${name} ${value + index}`,
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver, bgAtRest, bgAtInAction) => ({
  background: isDraggingOver ? bgAtRest : bgAtInAction,
  width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "red" : "pink",
  ...draggableStyle
});

const Context = ({ items, droppableId, onDragEnd, bgAtRest, bgAtInAction, children }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            padding: '1em',
            background: bgAtRest,
            width: '10em',
            margin: '0 auto',
            ...getListStyle(snapshot.isDraggingOver, bgAtRest, bgAtInAction),
          }}
        >
          {items.map((item, index) => (
            <Draggable draggableId={item.id} index={index} key={item.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: '0.5em',
                    background: 'red',
                    marginTop: '0.4em',
                    ...getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    ),
                  }}
                >
                  <div>{item.text}</div>
                  {children}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const DragAndDrop = () => {
  const [aItems, setAItems] = useState(initItems('a-item'));
  const [bItems, setBItems] = useState(initItems('b-item'));

  const onDragEnd = (result, items, setItems) => {
    if (!result.destination) {
      return;
    };

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  const onDragEndA = (result) => onDragEnd(result, aItems, setAItems);

  const onDragEndB = (result) => onDragEnd(result, bItems, setBItems);

  return (
    <Context
      items={aItems}
      droppableId="a-droppable-id"
      onDragEnd={onDragEndA}
      bgAtRest="lightgreen"
      bgAtInAction="green"
    >
      <Context
        items={bItems}
        droppableId="b-droppable-id"
        onDragEnd={onDragEndB}
        bgAtRest="lightbrown"
        bgAtInAction="brown"
      />
    </Context>
  );
};

export default DragAndDrop;
