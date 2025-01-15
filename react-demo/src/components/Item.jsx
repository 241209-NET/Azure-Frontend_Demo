import React from 'react'

//We have told React that our Item component expects an itemContent prop when it is rendered
//So whatever parent component renders Item, is responsible for providing that.
function Item( {itemContent} ) {
  return (
    //Returns whatever was passed in rendered inside a list-item element
    <li>{itemContent}</li>
  )
}

export default Item