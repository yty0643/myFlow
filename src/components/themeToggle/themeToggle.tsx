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
    width: 4rem;
    height: 1.5rem;
    
    ${({ theme, isDark }) => isDark ?
    `
    background-color: rgb(63, 73, 81);
    `
    :
    `
    background-color: rgb(185, 218, 239);
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
        line-height: 1.5rem;
        transition: all ease-in 200ms;
    }

    ::after{
        content: '';
        z-index: 1;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        transition: all ease-in 200ms;
        position: relative;
        top: 0;
        ${({ theme,isDark }) => isDark ? 
            `
                background-color: ${theme.toggleColors.dark};
                left: calc(0.6rem - 1.9rem);
            `
            :
            `
                background-color: ${theme.toggleColors.light};
                left: calc(-0.6rem + 1.9rem);
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