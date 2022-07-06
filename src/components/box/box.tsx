import React, { RefObject } from 'react';
import styled from 'styled-components';
import { IBox } from '../../sections/flow/flow';

interface IDiv{
}

const Div = styled.div<IDiv>`
position: absolute;
top:0;
left:0;
width: 11.2rem;
height 7rem;
background-color: rgb(200,200,200);
&:hover{
    background-color: rgb(220,220,220);
}
`

const Box = ({ boxRef }: { boxRef: RefObject<HTMLDivElement> }) => {
    return (
        <Div ref={boxRef} >
           
        </Div>
    );
};

export default Box;