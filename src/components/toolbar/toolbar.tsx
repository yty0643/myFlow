import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished'

const Div = styled.div`
position: absolute;
top: 0;
right: 0;
display: flex;
flex-direction: column;
align-items: center;
width: 15rem;
height: 100%;
padding: 1rem;
background-color: rgb(240,240,240);
`

const Button = styled.button`
position: absolute;
top: 0;
left: 0;
display:flex;
justify-content: center;
align-items: center;
width: 1rem;
height: 100%;
font-size: 1rem;
background-color: rgb(240,240,240);
transition: all ease-in 100ms;
&:hover{
    background-color: ${lighten(0.03,'rgb(240,240,240)')};
}
&:active{
    background-color: ${darken(0.03,'rgb(240,240,240)')};
}
`
const Toolbar = () => {
    const divRef = useRef<HTMLDivElement>(null);

    const onDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
        console.log("onDragStart");
        event.dataTransfer.setDragImage(new Image(), event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }

    const onDrag = (event: React.DragEvent<HTMLButtonElement>) => {
        if (!event.pageX || !divRef.current) return;
        const cmp = divRef.current.getBoundingClientRect().left - event.pageX;
        const width = divRef.current.clientWidth;
        divRef.current.style.width = width + cmp + 'px';
    }
    
    return (
        <Div ref={divRef}>
            <Button draggable={true} onDragStart={onDragStart} onDrag={onDrag} >
                <FontAwesomeIcon icon={faGripLinesVertical} />
            </Button>
        </Div>
    );
};

export default Toolbar;