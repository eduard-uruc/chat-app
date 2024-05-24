import React from 'react'
import { capitalizeFirstLetter } from '../../utils//stringUtils'
import { MenuItemContainer } from '../../styles/SideMenu.styles'

const MenuItem = ({ title, handleMenu, IconComponent, index, selectedItem }) => (

    <MenuItemContainer
        key={index}
        onClick={() => handleMenu(title)}
        isSelected={selectedItem === title}
    >
        <IconComponent style={{ width: '30px', height: '30px' }} />
        <p>{capitalizeFirstLetter(title)}</p>
    </MenuItemContainer>
);


export default MenuItem