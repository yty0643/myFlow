import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished'
import Tools from '../../components/tools/tools';
import Styles from '../../components/styles/styles';
import { useAppSelector } from '../../app/hooks';

const Div = styled.div`
z-index: 3;
position:absolute;
top: 0;
right: 0;
display: flex;
width: 15rem;
height: calc(100% - 3rem);
margin: 1.5rem;
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

const Toolbar = () => {
    const selectedIdx = useAppSelector(state => state.selected.index);
    const divRef = useRef<HTMLDivElement>(null);

    const resize = useCallback((event: MouseEvent) => {
        if (!divRef.current) return;
        const cmp = divRef.current.getBoundingClientRect().left - event.pageX;
        const width = divRef.current.clientWidth;
        divRef.current.style.width = width + cmp + 10 + 'px';
    }, []);
    
    return (
        <Div ref={divRef}>
            <Button
                onMouseDown={() => { document.addEventListener('mousemove', resize) }}
                onMouseUp={() => { document.removeEventListener('mousemove', resize) }}>
                <FontAwesomeIcon icon={faGripLinesVertical} />
            </Button>
            {selectedIdx < 0 ? <Tools /> : <Styles />}
        </Div>
    );
};

export default Toolbar;