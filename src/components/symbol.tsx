import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { ISymbol, setSymbol } from '../features/symbols/symbolsSlice';
import FlowBtns from './flowBtns';

const Div = styled.div`
position: absolute;
top: 0;
left: 0;
display: flex;
width: 100px;
height: 100px;
background-color: skyblue;
`

const Symbol = ({ value, index }: { value: ISymbol, index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const onMouseDown = (event: React.MouseEvent) => {
        if (!ref.current) return;
        const symbol = ref.current;
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
            symbol.style.left = x + "px";
            symbol.style.top = y + "px";
        };

        document.addEventListener('mousemove', move);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', move);
            dispatch(setSymbol({ // 변경사항 최종 저장. 추후 DB에 저장해야 함.
                symbol: {
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

    useEffect(() => {
        if (!ref.current) return;
        const symbol = ref.current;
        symbol.style.left = value.x + "px";
        symbol.style.top = value.y + "px";
    }, []);

    return (
        <Div
            ref={ref}
            onMouseDown={onMouseDown}>
            <FlowBtns index={index} />
        </Div>
    );
};

export default React.memo(Symbol);