import React, { RefObject, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';

interface ISection{
    isDark: boolean;
}

const Section = styled.section<ISection>`
    height: calc(100vh);
    transition: all ease-in 100ms;
    ${({ theme, isDark }) => isDark ?
    `
    background-color: ${theme.sectionColors.sign['dark']}
    `
    :
    `
    background-color: ${theme.sectionColors.sign['light']}
    `
    }}
`

const Sign = ({ secRef }: { secRef: RefObject<HTMLElement> }) => {
    const isDark = useAppSelector(state => state.theme.isActive);

    return (
        <Section isDark={isDark} ref={secRef}>
            
        </Section>
    );
};

export default Sign;