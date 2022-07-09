import React, { RefObject } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Symbol from '../../components/symbol/symbol';
import Tools from '../../components/tools/tools';
import { ISymbol, setSymbols } from '../../features/symbols/symbolsSlice';

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
background-color: ${theme.sectionColors.flow['dark']}
`
:
`
background-color: ${theme.sectionColors.flow['ligth']}
`
}}
`

export interface IOnMouseDown{
    (event: React.MouseEvent, index: number, ref:RefObject<HTMLDivElement>): void
};


const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const symbols = useAppSelector(state => state.symbols.symbols);
    const dispatch = useAppDispatch();

    const onDrop = (event: React.DragEvent) => {
        if (!secRef.current || !(secRef.current == event.target)) return;
        const temp = [...symbols];
        temp.push({
            x: Math.round(event.pageX),
            y: Math.round(event.pageY - secRef.current.offsetTop),
            title: "title",
            description: "description",
        });
        dispatch(setSymbols(temp));
    };

    const onMouseDown: IOnMouseDown = (event, index, ref) => {
        if (!secRef.current || !ref.current) return;
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
                x : Math.round(event.pageX - shiftX),
                y : Math.round(event.pageY - shiftY - section.offsetTop),
            }
            dispatch(setSymbols(temp));
            document.removeEventListener('mousemove', moveAt);
        };
        symbol.onmouseleave = (event: MouseEvent) => {
            symbol.style.zIndex = '1';
            document.removeEventListener('mousemove', moveAt);
        };
        symbol.ondragstart = ((event: MouseEvent) => {
            event.preventDefault();
        });
    };
    
    return (
        <Section
            ref={secRef}
            isDark={isDark}
            onDragOver={(event) => { event.preventDefault(); }}
            onDrop={onDrop}>
            {symbols.map((item, index) =>
                <Symbol
                    key={index}
                    index={index}
                    item={item}
                    onMouseDown={onMouseDown}/>
            )}
            <Tools />
        </Section>
    );
};

export default Flow;