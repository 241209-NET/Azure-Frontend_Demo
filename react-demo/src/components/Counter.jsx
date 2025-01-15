import React, { useState } from 'react'


//This function is our component. Its going to hold logic, state, etc as well as 
//define what will be displayed  once the component is rendered 
function Counter() {

    //Here we will declare a state variable named count
    //Notice that it's different from just declaring a plain JS variable
    //I create a state variable, a set-function and then call useState()
    //I set the initial value to 0, by passing that initial value into useStete()
    const [count, setCount] = useState(0); 

    //Function to increment my count (using arrow)
    const increment = () => setCount(count + 1);

    //Function to decrement my count (using function syntax)
    function decrement() {
        setCount(count - 1);
    }


  return (
    <div>
        <h2>Counter: {count}</h2>

        {/*This is a JSX comment.*/}
        {/*Here we will call our decrement function when this button is clicked*/}
        <button onClick={decrement}>Decrement</button>

        {/* This button will call the increment function */}
        <button onClick={increment}>Increment</button>




    </div>
  )
}

export default Counter