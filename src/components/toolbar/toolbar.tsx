import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { RefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished'
import Tool from '../tool/tool';


const Div = styled.div`
z-index: 3;
position:relative;
display: flex;
width: 15rem;
height: 100%;
background-color: rgb(240,240,240);
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Button = styled.button`
display:flex;
justify-content: center;
align-items: center;
width: 1rem;
height: 100%;
font-size: 1rem;
background-color: rgb(240,240,240);
transition: all ease-in 100ms;
&:hover{
    background-color: ${lighten(0.03, 'rgb(240,240,240)')};
}
&:active{
    background-color: ${darken(0.03, 'rgb(240,240,240)')};
}
`

const Tools = styled.div`
width: 100%;
overflow-y: scroll;
`

const Styles = styled.div`
width: 100%;
overflow-y: scroll;
`

const Toolbar = ({ selectedRef }: { selectedRef: RefObject<HTMLDivElement> | null }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const resize = useCallback((event: MouseEvent) => {
        if (!divRef.current) return;
        const cmp = divRef.current.getBoundingClientRect().left - event.pageX;
        const width = divRef.current.clientWidth;
        divRef.current.style.width = width + cmp + 10 + 'px';
    }, []);

    useEffect(() => {
        if (!selectedRef) return;
        console.log(selectedRef.current?.style.backgroundColor);

    }, [selectedRef]);
    
    return (
        <Div ref={divRef}>
            <Button
                onMouseDown={() => { document.addEventListener('mousemove', resize) }}
                onMouseUp={() => { document.removeEventListener('mousemove', resize) }}>
                <FontAwesomeIcon icon={faGripLinesVertical} />
            </Button>
            {selectedRef ?
                <Styles>
                    
                </Styles>
                :
                <Tools>
                    {arr.map((item, index) =>
                        <Tool key={index} />
                    )}
                </Tools>
            }
        </Div>
    );
};

export default Toolbar;