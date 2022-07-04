import React from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished'
import { isWhiteSpaceLike } from 'typescript';

interface IDivProps{
    color: string;
    // aa?: boolean;
};
  
const Div = styled.div<IDivProps>`
    width: 5rem;
    height: 5rem;
    background: ${props => props.color};
    border-radius: 50%;

    ${({ theme, color }) => {
        const selected = theme.colors[color];
        return `
    background: ${selected};
    &:hover{
        background: ${lighten(0.05, selected)};
    }
    &:active{
        background: ${darken(0.05, selected)};
    }
    `
    }}

    & + & {
    margin-left: 1rem;
    }
`;

const Box = ({ ...rest }: { color: string }) => {
    return (
        <Div {...rest}>

        </Div>
    );
};

Box.defaultProps = {
    color: 'white',
}

export default Box;