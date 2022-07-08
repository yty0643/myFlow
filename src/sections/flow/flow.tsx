import React, { RefObject, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Box from '../../components/box/box';
import Toolbar from '../../components/toolbar/toolbar';

interface ISection{
    isDark: boolean;
}

const Section = styled.section<ISection>`
transition: all ease-in 100ms;
display:flex;
width: 100%;
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

const Palette = styled.div`
    flex: 1 1 auto;
    position: relative;

`

export interface IBox{
    x: number,
    y: number,
}

export interface IOnClick{
    (box: RefObject<HTMLDivElement>): void;
}

const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const [boxes, setBoxes] = useState<IBox[]>([]);
    const [selectedRef, setSelectedRef] = useState<RefObject<HTMLDivElement>|null>(null);
    const paletteRef = useRef<HTMLDivElement>(null);

    const onDrop = (event: React.DragEvent) => {
        setBoxes((prev) => {
            const temp = [...prev];
            temp.push({
                x: event.pageX,
                y: event.pageY,
            });
            return temp;
        })
    }

    const boxClick:IOnClick = (ref) => {
        setSelectedRef(ref);
    }

    const onClick = (event: React.MouseEvent) => {
        if (event.target == paletteRef.current)
            setSelectedRef(null);
    }
    
    return (
        <Section ref={secRef} isDark={isDark}>
            <Palette
                ref={paletteRef}
                onDragOver={(event) => { event.preventDefault(); }}
                onDrop={onDrop}
                onClick={onClick}>
                {boxes.map((item, index) => <Box key={index} item={item} paletteRef={paletteRef} onClick={boxClick} />)}
            </Palette>
            <Toolbar selectedRef={selectedRef} />
        </Section>
    );
};

export default Flow;