import { useAppSelector } from './../app/hooks';
import { createGlobalStyle } from 'styled-components'

interface IGS{
    isDark: boolean;
}
export const GlobalStyle = createGlobalStyle<IGS>`
    *{
        box-sizing: border-box;
        ${({ theme, isDark }) => {
        const color = theme.textColor[isDark ? "light" : "dark"];
        return `
            color: ${color}
        `
        }}
    }

    body {
        margin: 0;
        font-family: 'Mulish', sans-serif;
    }
      
    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    section{
        display: flex;
        width: 100%;
        height: calc(100vh - 2rem);
    }

    button{
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        margin: 0;
        padding: 0;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }

    p{
        margin: 0;
        padding: 0;
    }

`
