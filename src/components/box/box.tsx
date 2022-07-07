import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IBox } from '../../sections/flow/flow';

interface IDiv{
}

const Div = styled.div<IDiv>`
z-index: 1;
position: absolute;
top:0;
left:0;
width: 11.2rem;
height 7rem;
background-color: skyblue;
transform: translate(-50%,-50%);
&:hover{
    background-color: rgb(220,220,220);
}
`

const Box = ({ coord }: { coord: IBox }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const translate = useCallback((event: MouseEvent) => {
        if (!divRef.current) return;
        console.log(event.x, event.y);
        // divRef.current.style.left = event.offsetX + 'px';
        // divRef.current.style.top = event.offsetY + 'px';
    }, []);
    
    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.left = coord.x +'px';
        divRef.current.style.top = coord.y +'px';
    }, []);

    return (
        <Div
            ref={divRef}
            onMouseDown={() => { document.addEventListener('mousemove', translate) }}
            onMouseUp={() => { document.removeEventListener('mousemove', translate) }}>
        </Div>
    );
};

export default Box;