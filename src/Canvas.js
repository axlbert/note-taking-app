// Canvas.js
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const canvasStyle = {
  flexGrow: 1,
  padding: '20px',
  backgroundColor: '#efefef',
  minHeight: '100vh',
  marginLeft: '2px',
};

const blockStyle = {
  background: 'white',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
};

const imageStyle = {
  maxWidth: '100px',
  objectFit: 'contain',
  borderRadius: '4px',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const noteInputStyle = {
  flexGrow: 2,
  padding: '5px 10px',
  margin: '0 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  display: 'none', // Initially hide the input
};

const notesTextStyle = {
  padding: '5px',
  flexGrow: 2, // Allows the text to take up available space
  textAlign: 'center', // Center the text
  alignSelf: 'center', // Align vertically within the flex container
};


const Canvas = ({ blocks,  droppableId, onDelete, onNotesChange, selectItem, selectedItemIndex }) => {
  const handleBlockClick = (e, index) => {
    e.stopPropagation();
    selectItem(selectedItemIndex === index ? null : index); // Toggle selection
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevents the block click event from firing
  };

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={canvasStyle}>
          {blocks.map((block, index) => (
            <Draggable key={block.id} draggableId={block.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={{
                    ...blockStyle,
                    backgroundColor: snapshot.isDragging ? '#eaeaea' : 'white',
                    ...provided.draggableProps.style,
                  }}
                  onClick={(e) => handleBlockClick(e, index)}
                >
                  <div style={contentStyle} {...provided.dragHandleProps}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${block.image}`}
                      alt={block.content}
                      style={imageStyle}
                    />
                    <span>{block.content}</span>
                  </div>
                  {selectedItemIndex === index ? (
                    <input
                      type="text"
                      value={block.notes || ''}
                      onChange={(e) => onNotesChange(e, index)}
                      placeholder="Add notes here"
                      style={{ ...noteInputStyle, display: 'block' }} // Show input when selected
                      onClick={handleInputClick}
                    />
                  ) : block.notes && (
                    <div style={notesTextStyle}>{block.notes}</div>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); onDelete(index); }} style={deleteButtonStyle}>X</button>
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

export default Canvas;
