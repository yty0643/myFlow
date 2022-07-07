import React, { RefObject, useEffect, useState} from 'react';
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

const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const [box, setBox] = useState<IBox[]>([]);

    const onDrop = (event: React.DragEvent) => {
        setBox((prev) => {
            const temp = [...prev];
            temp.push({
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
            });
            return temp;
        })
    }

    return (
        <Section ref={secRef} isDark={isDark}>
            <Palette
                onDragOver={(event) => { event.preventDefault(); }}
                onDrop={onDrop}>
                {box.map((item, index) => <Box key={index} coord={item} />)}
                </Palette>
            <Toolbar />
        </Section>
    );
};

export default Flow;