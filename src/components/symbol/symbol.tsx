import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darken, lighten } from 'polished';
import React, { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { ISymbol } from '../../features/symbols/symbolsSlice';
import { IFlowHandler, ISymbolHandler } from '../../sections/chart/chart';

interface IDiv{
    isDark: boolean,
}

const Div = styled.div<IDiv>`
-webkit-touch-callout: none;
-moz-user-select: none;
-ms-user-select: none;
-webkit-user-select: none;
user-select: none;
z-index: 1;
position: absolute;
top:0;
left:0;
display:flex;
flex-direction: column;
align-items: center;
width: 15rem;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
transition: transform ease-in 100ms;
${({ theme, isDark }) => {
    const color: string = theme.symbolColor[isDark ? "dark" : "light"];
    return `
    background-color: ${color};
    &:hover{
        transform: scale(1.02);
    }
    &:active{
        background-color: ${darken(0.05, color)};
    }
    `
}}
`
const Horizontal = styled.div`
width: 100%;
height: 0.5px;
background-color:grey;
`

const Upper = styled.div`
display: flex;
align-items: center;
width: 100%;
padding: 0.5rem 1rem;
font-size: 0.8rem;
font-weight: 500;
`
const Icon = styled.p`
font-size: 1rem;
padding-right: 0.5rem;
`
const Lower = styled.div`
display:flex;
align-items:center;
width: 100%;
padding: 1rem;
font-size: 0.8rem;
font-weight: 300;
`

interface IButton{
    idx: number,
};
const Button = styled.button<IButton>`
position: absolute;
${({ idx }) => {
    switch (idx) {
        case 0:
            return `
            top: 0;
            left: 50%;
            `
        case 1:
            return `
            top: 50%;
            left: 100%;
            `
        case 2:
            return `
            top: 100%;
            left: 50%;
            `
        case 3:
            return `
            top: 50%;
            left: 0;
            `
    }
}}
width: 0.9rem;
height: 0.9rem;
border: 0.2rem solid white;
border-radius: 50%;
transform: translate(-50%, -50%);
background-color: rgb(0,0,0);
&:hover{
    background-color: ${lighten(0.5, 'rgb(0,0,0)')};
}
&:active{
    background-color: skyblue};
}
`

const Symbol = ({ index, item, symbolHandler, flowStart, flowEnd }: { index: number, item: ISymbol, symbolHandler: ISymbolHandler, flowStart: IFlowHandler, flowEnd: IFlowHandler}) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const selectedIdx = useAppSelector(state => state.selected.index);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.left = item.x - divRef.current.offsetWidth / 2 + 'px';
        divRef.current.style.top = item.y - divRef.current.offsetHeight / 2 + 'px';
    }, []);

    return (
        <Div
            isDark={isDark}
            ref={divRef}
            onMouseDown={(event) => { symbolHandler(event, index, divRef) }}>
            <Upper>
                <Icon>
                    <FontAwesomeIcon icon={faDatabase} />
                </Icon>
                <p>
                    {item.values.title}
                </p>
            </Upper>
            <Horizontal />
            <Lower>
                <p>{item.values.description}</p>
            </Lower>
            {selectedIdx > -1 && Array(4).fill(0).map((item, idx) =>
                <Button
                    id={`${idx}`}
                    key={idx}
                    idx={idx}
                    onMouseDown={(event) => { flowStart(event, index, idx) }}
                    onMouseUp={(event) => { flowEnd(event, index, idx) }} />
            )}
        </Div>
    );
};

export default React.memo(Symbol);