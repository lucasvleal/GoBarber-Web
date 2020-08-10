import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #FF9000;
    border: 0;
    border-radius: 10px;
    height: 56px;
    padding: 0 16px;
    width: 100%;
    font-weight: 500;
    color: #312E38;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#FF9000')};
    }
`;
