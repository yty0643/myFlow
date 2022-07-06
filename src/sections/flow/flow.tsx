import React, { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Box from '../../components/box/box';
import Toolbar from '../../components/toolbar/toolbar';

interface ISection{
    isDark: boolean;
}

const Section = styled.section<ISection>`
z-index: 0;
position: relative;
transition: all ease-in 100ms;
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

const Div = styled.div`
    position: relative;
    display: flex;
    width: 5rem;
    height: 5rem;
    background-color: skyblue;
`

export interface IBox{
    x: number,
    y: number,
}

// boxRef.current!.style.left = event.pageX+'px';
// boxRef.current!.style.top = event.pageY - secRef.current!.offsetTop + 'px';

const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);

    return (
        <Section isDark={isDark} ref={secRef}>
            <Toolbar />
        </Section>
    );
};

export default Flow;