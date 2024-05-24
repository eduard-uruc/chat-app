import React from 'react'

const ListItem = ({ item, property }) => (
    <span className='pointer flex-container'>{item[property]}</span>
);

export default ListItem;