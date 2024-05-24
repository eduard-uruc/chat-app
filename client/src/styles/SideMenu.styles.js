import styled from 'styled-components';

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;  
  font-size: 14px;
  margin: 0 2px 10px 0;
  color: #607eaa;
  background-color: #f9f5eb;
 
  img {
    margin-top: 10px;
  }
  
  span {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center;  
    font-size: 12px;
  }
`;

export const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  background-color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#f9f5eb')};
  cursor: pointer; 
  width: 70px;
  padding: 1em; 

  &:hover {
    background-color: #e0f7fa;
  }
`