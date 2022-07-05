import React, { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';

interface ISection{
    isDark: boolean;
}

const Section = styled.section<ISection>`
    height: calc(100vh);
    ${({ theme, isDark }) => {
        const color = theme.sectionColors.sign[isDark ? "black" : "white"];
        return `    
            background-color: ${color};
        `
    }}
    transition: all ease-in 100ms;
`

const Sign = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);

    return (
        <Section isDark={isDark} ref={secRef}>
            
        </Section>
    );
};

export default Sign;