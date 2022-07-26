import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { setEnd, setStart } from '../features/flows/flowsSlice';
import { ISymbol, setSymbol } from '../features/symbols/symbolsSlice';

interface IDiv{
    width: number,
    height: number,
}

const Div = styled.div<IDiv>`
position: absolute;
top: 0;
left: 0;
display: flex;
flex-direction: column;
${({ width, height }) => `
width: ${width}px;
height: ${height}px;
`
}
border-radius: 8px;
border: 1px solid black;
background-color: white;
`

interface IFlowBtn{
    index: number,
}

const FlowBtn = styled.button<IFlowBtn>`
position: absolute;
${({index}) => {
    switch (index) {
        case 0:
            return `
            top: 0;
            left: 50%;
            `;
        case 1:
            return `
            top: 100%;
            left: 50%;
            `;

    }
}}
width: 10px;
height: 10px;
background-color: black;
transform: translate(-50%, -50%);
`

const SideBtn = styled.button`
position: absolute;
top: 0;
left: 100%;
width: 1rem;
height: 1rem;
background-color: black;
`

const Upper = styled.div`
display: flex;
align-items: center;
width: 100%;
padding: 0.5rem 1.5rem;
font-size: 1rem;
font-weight: 500;
`
const Horizontal = styled.div`
width: 100%;
height: 0.5px;
background-color: black;
`

const Lower = styled.div`
display: flex;
align-items: center;
padding: 0.5rem 1.5rem;
font-size: 0.8rem;
font-weight: 300;
`

const Icon = styled.div`
padding-right: 0.5rem;
`

const Symbol = ({ divRef, value, index }: { divRef: RefObject<HTMLDivElement>, value: ISymbol, index: number }) => {
    const dispatch = useAppDispatch();
    const btnArr = [0, 1];

    const onMouseDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!divRef.current) return;
        const symbol = divRef.current;
        const shiftX = event.nativeEvent.offsetX;
        const shiftY = event.nativeEvent.offsetY;
        const topY = event.currentTarget.parentElement!.parentElement!.offsetTop;
        const maxX = event.currentTarget.parentElement!.offsetWidth - symbol.offsetWidth;
        const maxY = event.currentTarget.parentElement!.offsetHeight - symbol.offsetHeight;

        const move = (event: MouseEvent) => {
            let x = event.pageX - shiftX;
            let y = event.pageY - shiftY - topY;
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            x = x > maxX ? maxX : x;
            y = y > maxY ? maxY : y;
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
            symbol.style.left = x + "px";
            symbol.style.top = y + "px";
            console.log(x,y);
            console.log(event.offsetX);

        };

        document.addEventListener('mousemove', move);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', move);
            dispatch(setSymbol({ // 변경사항 최종 저장. 추후 DB에 저장해야 함.
                symbol: {
                    ...value,
                    x: symbol.offsetLeft,
                    y: symbol.offsetTop,
                },
                index
            }));
            document.onmouseup = null;
        };
        symbol.ondragstart = () => {
            return false;
        }
    };

    const onBtnDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(setStart([index, Number(event.currentTarget.id)]));
        dispatch(setEnd([]));
    };

    const onBtnUp = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(setEnd([index, Number(event.currentTarget.id)]));
    }

    const onClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    useEffect(() => {
        if (!divRef || !divRef.current) return;
        const symbol = divRef.current;
        symbol.style.left = value.x + "px";
        symbol.style.top = value.y + "px";
    }, [divRef]);

    return (
        <Div
            ref={divRef}
            onMouseDown={onMouseDown}
            width={value.width}
            height={value.height}>
            <Upper>
                <Icon>
                    <FontAwesomeIcon icon={faDatabase} />
                </Icon>
                <p>title</p>
            </Upper>
            <Horizontal/>
            <Lower>
                <p>desc</p>
            </Lower>
            {btnArr.map((value, index) =>
                <FlowBtn
                    key={index}
                    id={`${index}`}
                    index={index}
                    onMouseDown={onBtnDown}
                    onMouseUp={onBtnUp}
                    onDragStart={() => { return false }}
                />
            )}
            <SideBtn onMouseDown={onClick} />
        </Div>
    );
};

export default React.memo(Symbol);