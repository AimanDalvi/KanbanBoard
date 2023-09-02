import React,{useContext} from 'react';
import {BoardContext} from './Board'
import CardItem from './CardItem'
function Lane(props) {
  const { onDragStartHandler, onDragOverHandler } = useContext(BoardContext);
    return (
        <>
      {props.tasks
        .filter((item) => item.stage === props.stage.id)
        .map((item, index) => (
          <div
            draggable
            key={item._id} // Use the "_id" field as the key
            onDragStart={(event) =>
              onDragStartHandler(event, item._id, props.stage.id)
            }
            onDragOver={(event) => onDragOverHandler(event)}
          >
            <CardItem task={item} />
          </div>
        ))}
    </>
    )
}

export default Lane