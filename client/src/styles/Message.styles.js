import styled from 'styled-components';

export const MessageChat = styled.div`
    margin-bottom: 10px;
`;

export const SenderName = styled.p` 
    color: #007bff;  
    margin-left: auto;
    font-size: 13px;
    max-width: 300px;
    width: fit-content;
`;

export const RecipientName = styled.p` 
    color: #dc3545;  
    font-size: 13px;
    max-width: 300px;
`;

export const MessageContent = styled.div`
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    position: relative;
    margin-top: 5px;
    max-width: 300px;
    width: fit-content;
    margin-left: ${props => props.auto ? 'auto' : 'unset'};
    font-size: 13px;
    word-wrap: break-word;
    overflow: hidden;
    white-space: pre-wrap;
`;

export const MessageText = styled.p`
    margin: 0;
`;

export const MessageTimestamp = styled.em`
    display: block;
    font-size: 0.75em;
    color: #888;
    margin-top: 5px;
`;