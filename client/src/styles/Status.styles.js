import styled from 'styled-components';

export const StatusContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0dcd3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c7a75;
  font-weight: bold;
  font-size: 12px;
  margin-right: 5px;
`;

export const StatusIcon = styled.div`
  position: absolute;
  top: -2px;
  right: -2px; 

  background-color: ${({ isOnline }) => (isOnline ? '#4caf50' : '#f44336')};

  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;