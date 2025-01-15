import React, {useState, useContext, useReducer} from 'react'
import Item from './Item'
import { ThemeContext } from '../App';


//Outside of my component, I will write my reducer
//Im going to use a reducer to manage my item list

const itemReducer = (state, action) => {
    //Inside of my reducer, I can do things based on the user's action
    //In this case, I will use a switch to call functions based on the action
    //that is passed in
    switch(action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload]
        case 'RESET':
            return []
        default:
            return state;
    }


}



function ItemList() {

    //Inside of the component, we will call useReducer
    //State is now managed by our Reducer, so we don't need useState
    //If I wanted default values, I'd put them in the call to useReducer
    const [items, itemDispatch] = useReducer(itemReducer, ['This is my default, from UseReducer'])

    //Now we have to access the ThemeContext
    const { theme, toggleTheme} = useContext(ThemeContext)

    //State for managing a user-inputted value, that we will later pass to our Item component
    const [newItem, setNewItem] = useState('');

    //State for holding my list of items to display
    //const [items, setItems] = useState(['This is my first/default item.', 'Pancake']);

    const addItem = () => {
        if(newItem.trim()) {
            // //Add the new item to the list stored in state
            // //Hint: this uses the spread operator in JS "..."
            // setItems([...items, newItem.trim()]);

            // //Just clearing our text field
            
            itemDispatch({ type: 'ADD_ITEM', payload: newItem.trim()});
            
            setNewItem('');
        }
    }

    //This function calls our RESET case in our reducer, 
    const resetItems = () => {
        itemDispatch({type: 'RESET'})
    }

    const handleInputChange = (event) => {
        setNewItem(event.target.value);
    }

  return (
    <div>
        <input 
            type="text"
            value={newItem}
            onChange={handleInputChange}
            placeholder='Enter a new item'
        />
        <button onClick={addItem}>Add Item</button>
        <button onClick={resetItems}>Reset Items</button>
        
        {/* List that will be populated with Item components based on the values stored in items array */}
        <ol>
            {
                items.map((item, index) => (
                    //Rendering the item component
                    <Item key={index} itemContent={item} />
                ))
            }
        </ol>

        <button onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
        

    </div>
  )
}

export default ItemList