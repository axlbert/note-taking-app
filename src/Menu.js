// Menu.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const menuStyle = {
  padding: '20px',
  width: '250px',
  minHeight: '100vh',
  boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)', // Shadow effect
};


const blockStyle = {
  background: 'white',
  border: '1px solid #ddd',
  borderRadius: '8px', // Rounded edges
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Shadow effect
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Align items to the start
  cursor: 'pointer',
};

const imageStyle = {
  maxWidth: '50px', // Adjust as needed for your layout
  marginRight: '10px',
  objectFit: 'contain',
  borderRadius: '4px', // Optional: if you want the images to have rounded corners
};

const Menu = ({ blocks }) => {
  return (
    <Droppable droppableId="menu" isDropDisabled={true}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={menuStyle}>
          {blocks.map((block, index) => (
            <Draggable key={block.id} draggableId={block.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...blockStyle,
                    backgroundColor: snapshot.isDragging ? '#e0e0e0' : 'white',
                    ...provided.draggableProps.style,
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/${block.image}`}
                    alt={block.content}
                    style={imageStyle}
                  />
                  <span>{block.content}</span>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Menu;
