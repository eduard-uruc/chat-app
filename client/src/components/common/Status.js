import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

import { getAcronym } from '../../utils/stringUtils'
import { StatusContainer, StatusIcon } from '../../styles/Status.styles'


const Status = ({ name, isOnline, hasStatus }) => {
    const acronym = getAcronym(name)

    return (
        <StatusContainer>
            {acronym}
            {hasStatus && (
                <StatusIcon isOnline={isOnline}>
                    {isOnline ? <FaCheck size={10} /> : <FaTimes size={10} />}
                </StatusIcon>
            )}
        </StatusContainer>
    );
};

export default Status 