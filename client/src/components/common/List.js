import React, { useState } from 'react'

import ListItem from '../common/ListItem'
import Status from '../common/Status'

import { twelveHourFormat } from '../../utils/timeFormatUtils'
import { Container } from '../../styles/Container.styles'
import { ListItemContainer } from '../../styles/List.styles';
import { Notification } from '../../styles/Notification.styles';

const List = ({ items, handleClick, property, hasStatus = false }) => {
    const [selectedItem, setSelectedItem] = useState(null)

    const handleItemClick = (item) => {
        console.log('handle click list', item[property])

        setSelectedItem(item[property])
        handleClick(item[property])
    };

    return (
        <div>
            <Container position='left'>
                {items.map((item, index) => (
                    <ListItemContainer
                        key={item?._id || index}
                        onClick={() => handleItemClick(item)}
                        isSelected={selectedItem === item[property]}
                    >

                        <Container position='left' direction="row">
                            <Status
                                name={item[property]}
                                isOnline={item.online}
                                hasStatus={hasStatus}
                            />
                            <ListItem
                                item={item}
                                property={property}
                            />
                            {/* {twelveHourFormat(new Date())} */}
                        </Container>
                        <Container>
                            <Notification>
                                3
                            </Notification>
                        </Container>
                    </ListItemContainer>
                ))}
            </Container>
        </div>
    )
}

export default List