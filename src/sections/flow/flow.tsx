import React, { RefObject, useRef, useState} from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Palette from '../../components/palette/palette';
import Tools from '../../components/tools/tools';

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

export interface IBox{
    x: number,
    y: number,
    title: string,
    description: string,
}

export interface IOnClick{
    (box: RefObject<HTMLDivElement>): void;
}

const Flow = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    
    return (
        <Section ref={secRef} isDark={isDark}>
            <Palette />
            <Tools />
        </Section>
    );
};

export default Flow;