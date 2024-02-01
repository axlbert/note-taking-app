import React, { useState } from 'react';
import Menu from './Menu';
import Canvas from './Canvas';
import Header from './Header';
import initialBlocks from './blocks';
import { DragDropContext } from 'react-beautiful-dnd';
import GeneralNotes from './GeneralNotes';

function App() {
  const [menuBlocks, setMenuBlocks] = useState([...initialBlocks]);
  const [canvasBlocks, setCanvasBlocks] = useState([]); // Not used in multi-column setup
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [notes, setNotes] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [columns, setColumns] = useState([{ id: 'column-1', items: [] }]);

  const addLine = () => {
    const newColumnId = `column-${columns.length + 1}`;
    setColumns([...columns, { id: newColumnId, items: [] }]);
  };

  const addButtonStyle = {
    backgroundColor: '#007bff', // Example color
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start', // Align button to the start of the column
    margin: '10px 0',
    marginLeft: '20px' 
  };

  const removeButtonStyle = {
    backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
    marginLeft: '10px',
    verticalAlign: 'middle'
  };

  const removeLine = (columnId) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'menu' && destination.droppableId.includes('column')) {
      const itemToAdd = { ...menuBlocks[source.index] };
      itemToAdd.id = 'canvas-' + Date.now() + '-' + itemToAdd.id;

      const destinationColumn = columns.find(col => col.id === destination.droppableId);
      const destinationItems = Array.from(destinationColumn.items);
      destinationItems.splice(destination.index, 0, itemToAdd);

      setColumns(columns.map(col => col.id === destination.droppableId ? { ...col, items: destinationItems } : col));
    } else if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destinationColumn = columns.find(col => col.id === destination.droppableId);
      const sourceItems = Array.from(sourceColumn.items);
      const destinationItems = Array.from(destinationColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, items: sourceItems };
        } else if (col.id === destination.droppableId) {
          return { ...col, items: destinationItems };
        } else {
          return col;
        }
      }));
    }
    // Add more conditions as needed for handling within the same column
  };

  const handleGeneralNotesChange = (event) => {
    setGeneralNotes(event.target.value);
  };

  const deleteCanvasBlock = (index, columnId) => {
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return { ...col, items: col.items.filter((_, i) => i !== index) };
      } else {
        return col;
      }
    }));
  };

  const onNotesChange = (event, index, columnId) => {
    const newNotes = event.target.value;
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          items: col.items.map((block, i) => i === index ? { ...block, notes: newNotes } : block)
        };
      } else {
        return col;
      }
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header />
      <div className="App" style={{ display: 'flex' }}>
        <Menu blocks={menuBlocks} />
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <GeneralNotes
            notes={generalNotes}
            onNotesChange={handleGeneralNotesChange}
          />
          <button onClick={addLine} style={addButtonStyle}>Add Line</button>
          <div style={{ display: 'flex' }}>
            {columns.map((column, index) => (
              <div key={column.id} style={{ flexGrow: 1 }}>
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ display: 'inline-block' }}>Line {index + 1}</h2>
                  <button
                    onClick={() => removeLine(column.id)}
                    style={removeButtonStyle}
                  >
                    X
                  </button>
                </div>
                <Canvas
                  droppableId={column.id}
                  blocks={column.items}
                  onDelete={(index) => deleteCanvasBlock(index, column.id)}
                  onNotesChange={(e, index) => onNotesChange(e, index, column.id)}
                  selectItem={setSelectedItemIndex}
                  selectedItemIndex={selectedItemIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
