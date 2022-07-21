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
${({ width, height }) => `
width: ${width}px;
height: ${height}px;
`
}

background-color: skyblue;
`

interface IButton{
    index: number,
}

const Button = styled.button<IButton>`
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
            top: 50%;
            left: 100%;
            `;
        case 2:
            return `
            top: 100%;
            left: 50%;
            `;
        case 3:
            return `
            top: 50%;
            left: 0;
            `;
    }
}}
width: 10px;
height: 10px;
background-color: black;
transform: translate(-50%, -50%);
`

const Symbol = ({ divRef, value, index }: { divRef: RefObject<HTMLDivElement>, value: ISymbol, index: number }) => {
    const dispatch = useAppDispatch();
    const btnArr = [0, 1, 2, 3];

    const onMouseDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!divRef.current) return;
        const symbol = divRef.current;
        const shiftX = event.nativeEvent.offsetX;
        const shiftY = event.nativeEvent.offsetY;
        const topY = event.currentTarget.parentElement!.offsetTop;
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
            {btnArr.map((value, index) =>
                <Button
                    key={index}
                    id={`${index}`}
                    index={index}
                    onMouseDown={onBtnDown}
                    onMouseUp={onBtnUp}
                    onDragStart={() => { return false }}
                />
            )}
        </Div>
    );
};

export default React.memo(Symbol);