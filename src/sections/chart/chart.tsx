import React, { RefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Symbol from '../../components/symbol/symbol';
import Toolbar from '../toolbar/toolbar';
import { setSymbols } from '../../features/symbols/symbolsSlice';
import { setSelected } from '../../features/selected/selectedSlice';

interface ISection{
    isDark: boolean;
};

const Section = styled.section<ISection>`
position: relative;
display:flex;
width: 100%;
transition: all ease-in 100ms;
${({ theme, isDark }) => isDark ?
`
background-color: ${theme.sectionColors.chart['dark']};
`
:
`
background-color: ${theme.sectionColors.chart['light']};
`
}}
`

export interface ISymbolHandler{
    (event: React.MouseEvent, index: number, ref:RefObject<HTMLDivElement>): void
};

export interface IFlowHandler{
    (event: React.MouseEvent, index: number, btnIdx:number): void
};

const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const symbols = useAppSelector(state => state.symbols.symbols);
    const dispatch = useAppDispatch();
    const [start, setStart] = useState<number[]>([]);
    const [flow, setFlow] = useState<number[][][]>([]);

    const onDrop = (event: React.DragEvent) => {
        if (!secRef.current || !(secRef.current == event.target)) return;
        const temp = [...symbols];
        temp.push({
            x: Math.round(event.pageX),
            y: Math.round(event.pageY - secRef.current.offsetTop),
            values: {
                title: "title",
                description: "description",
            }
        });
        dispatch(setSymbols(temp));
    };

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const onMouseDown = (event: React.MouseEvent) => {
        if (event.target == secRef.current)
            dispatch(setSelected(-1));
    };

    const symbolHandler: ISymbolHandler = (event, index, ref) => {
        if (!secRef.current || !ref.current) return;
        dispatch(setSelected(index));
        const section = secRef.current;
        const symbol = ref.current;
        symbol.style.zIndex = '3';

        const shiftX = event.clientX - symbol.getBoundingClientRect().left;
        const shiftY = event.clientY - symbol.getBoundingClientRect().top;

        const moveAt = (event: MouseEvent) => {
            const x = Math.round(event.pageX - shiftX);
            const y = Math.round(event.pageY - shiftY - section.offsetTop);

            if (x < 0 || x + symbol.offsetWidth >= section.offsetWidth || y < 0 || y + symbol.offsetHeight >= section.offsetHeight) return;
            symbol.style.left = x + 'px';
            symbol.style.top = y + 'px';
        };

        document.addEventListener('mousemove', moveAt);

        symbol.onmouseup = (event: MouseEvent) => {
            symbol.style.zIndex = '1';
            const temp = [...symbols];
            temp[index] = {
                ...temp[index],
                x: Math.round(event.pageX),
                y: Math.round(event.pageY - section.offsetTop),
            }
            dispatch(setSymbols(temp));
            document.removeEventListener('mousemove', moveAt);
            symbol.onmouseup = null;
        };
        symbol.onmouseleave = (event: MouseEvent) => {
            symbol.style.zIndex = '1';
            document.removeEventListener('mousemove', moveAt);
            symbol.onmouseleave = null;
        };
        symbol.ondragstart = (event: MouseEvent) => {
            event.preventDefault();
        };
    };

    const flowStart: IFlowHandler = (event, index, btnIdx) => {
        event.stopPropagation();
        setStart([index, btnIdx]);
    };

    const flowEnd: IFlowHandler = (event, index, btnIdx) => {
        event.stopPropagation();
        if (start[0] == index) return;

        setFlow(prev => {
            const temp = [...prev];
            console.log(temp[1]);
            temp[start[0]][start[1]] = [index, btnIdx];
            return temp;
        });
    };

    useEffect(() => {
        const size = symbols.length;
        setFlow(Array(size).fill(Array(4).fill(Array(2).fill(-1))));
    }, [symbols]);

    useEffect(() => {
        flow.forEach((symbol, symbolIdx) => {

        })
    }, [flow]);

    return (
        <Section
            ref={secRef}
            isDark={isDark}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onMouseDown={onMouseDown} >
            {symbols.map((item, index) =>
                <Symbol
                    key={index}
                    index={index}
                    item={item}
                    symbolHandler={symbolHandler}
                    flowStart={flowStart}
                    flowEnd={flowEnd} />
            )}
            <Toolbar />
        </Section>
    );
};

export default React.memo(Flow);