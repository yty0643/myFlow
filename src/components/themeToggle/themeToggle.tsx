import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onToggle } from '../../features/theme/themeSlice';

interface IButton{
    isDark: boolean,
};

const Button = styled.button<IButton>`
    z-index: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2em;
    width: 5rem;
    height: 2rem;

    ${({ theme, isDark }) => {
    const bgColor = theme.toggleColors[isDark ? 'bgDark' : 'bgLight'];
    return `
        background-color: ${bgColor};
    `
    }}

   

    ::before{
        ${({ isDark }) => isDark ? 
            `
                content: 'dark';
                left: 70%;
                `
                :
                `
                content: 'light';                
                left: 30%;
            `
        }
        z-index: 1;
        position: absolute;
        display: flex;
        top: 0;
        transform : translateX(-50%);
        line-height: 2rem;
        transition: all ease-in 200ms;
    }

    ::after{
        content: '';
        z-index: 1;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        transition: all ease-in 200ms;
        position: relative;
        top: 0;
        ${({ theme,isDark }) => isDark ? 
            `
                background-color: ${theme.toggleColors.dark};
                left: calc(0.8rem - 2.3rem);
            `
            :
            `
                background-color: ${theme.toggleColors.light};
                left: calc(-0.8rem + 2.3rem);
            `
        }
    }
`

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const isDark = useAppSelector((state) => state.theme.isActive);

    return (
        <Button isDark={isDark} onClick={() => { dispatch(onToggle()) }} />
    );
};

export default ThemeToggle;