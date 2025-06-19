import React, { useState, useEffect } from 'react';
import "./style.css";

// ✅ Function to get data from localStorage
const getLocalData = () => {
  const lists = localStorage.getItem('mytodolist');
  return lists ? JSON.parse(lists) : [];
};

const Todo = () => {
  const [inputdata, setInputdata] = useState('');
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // ✅ Add or Update item
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill in the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      // Reset state after edit
      setInputdata('');
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputdata('');
    }
  };

  // ✅ Edit item
  const editItem = (id) => {
    const itemToEdit = items.find((curElem) => curElem.id === id);
    setInputdata(itemToEdit.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  // ✅ Delete a specific item
  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => curElem.id !== id);
    setItems(updatedItems);
  };

  // ✅ Remove all items
  const removeAll = () => {
    setItems([]);
  };

  // ✅ Save items to localStorage
  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items));
  }, [items]);

  return (
    <div className='main-div'>
      <div className="child-div">
        <figure>
          <img src="/images/todolist.png" alt="todologo" />
          <figcaption>Add Your List Here ✌️</figcaption>
        </figure>

        <div className='addItems'>
          <input
            type='text'
            placeholder='📝 Add Item'
            className='form-control'
            value={inputdata}
            onChange={(event) => setInputdata(event.target.value)}
          />
          {toggleButton ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
        </div>

        {/* ✅ Show all items */}
        <div className='showItems'>
          {items.map((curElem) => (
            <div className='eachItem' key={curElem.id}>
              <h3>{curElem.name}</h3>
              <div className='todo-btn'>
                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Remove All button */}
        <div className='showItems'>
          <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
            <span> CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
