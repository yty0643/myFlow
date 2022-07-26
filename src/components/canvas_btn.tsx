import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
width: 1rem;
height: 1rem;
font-size: 1rem;
background-color: white;
color: black;
:hover{
    background-color: rgb(240,240,240);
}
`

const CanvasBtn = ({ icon, onClick }: { icon: IconDefinition, onClick: () => void }) => {
    
    return (
        <Button onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </Button>
    );
};

export default CanvasBtn;