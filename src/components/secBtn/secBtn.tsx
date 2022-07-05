import React from 'react';
import styled from 'styled-components';
import { IOnClick } from '../../App';

interface IButton{
    isActive: boolean;
}

const Button = styled.button<IButton>`
    margin-right: 1rem;
    ${({ theme, isActive }) => isActive && `
    color: ${theme.textColor.blue};
    `}
`

const SecBtn = ({ isActive, children, index, onClick }: { isActive:boolean, children: string, index: number, onClick: IOnClick }) => {

    return (
        <Button isActive={isActive} onClick={() => { onClick(index) }}>
            {children}
        </Button>
    );
};

export default React.memo(SecBtn);