import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ISymbol } from '../../features/symbols/symbolsSlice';
import { IOnMouseDown } from '../../sections/chart/chart';

const Div = styled.div`
z-index: 1;
position: absolute;
top:0;
left:0;
width: 11.2rem;
height: 7rem;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
&:hover{
    background-color: rgb(245,245,245);
}
`

const Title = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.5px solid rgb(220,220,220);
`

const Desc = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`

const Icon = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 1rem; 
`

const Symbol = ({ index, item, onMouseDown }: { index: number, item: ISymbol, onMouseDown: IOnMouseDown }) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.left = item.x - divRef.current.offsetWidth / 2 + 'px';
        divRef.current.style.top = item.y - divRef.current.offsetHeight / 2 + 'px';
    }, []);

    useEffect(() => {
        console.log(item);
        console.log("rendering!");
    }, [index]);
    
    return (
        <Div
            ref={divRef}
            onMouseDown={(event) => { onMouseDown(event, index, divRef) }}>
            <Title>
                <Icon>
                    <FontAwesomeIcon icon={faDatabase} />
                </Icon>
                <p>{item.values.title}</p>
            </Title>
            <Desc>
                <p>{item.values.description}</p>
            </Desc>
        </Div>
    );
};

export default React.memo(Symbol);