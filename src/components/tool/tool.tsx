import React from 'react';
import styled from 'styled-components';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    background-color: white;
    & + &{
        margin-top: 3px;
    }
`

const Icon = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    font-size: 1rem;
    width: 3rem;
    padding: 0 1rem;
    `
    
const P = styled.p`
    width: 100%;
    text-align: start;
`

const Tool = () => {
    return (
        <Button draggable={true}>
            <Icon>
                <FontAwesomeIcon icon={faDatabase} />
            </Icon>
            <P>description</P>
        </Button>
    );
};

export default Tool;