import styled from 'styled-components';

export const ListItemContainer = styled.div`
    display: flex;
    justify-content: space-between;;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    background-color: ${({ isSelected }) => (isSelected ? 'white' : '#f9f5eb')};
    cursor: pointer;
    
    &:hover {
        background-color: #e0f7fa;
    }
`;

export const Circle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ isOnline }) => (isOnline ? 'green' : 'red')};
    margin-left: 10px;
`;