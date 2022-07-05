import React from 'react';
import styled from 'styled-components';
import { IOnClick } from '../../App';

const Button = styled.button`
    margin-right: 1rem;
`

const SecBtn = ({ children, index, onClick }: { children: string, index: number, onClick: IOnClick }) => {

    return (
        <Button onClick={() => { onClick(index) }}>
            {children}
        </Button>
    );
};

export default React.memo(SecBtn);