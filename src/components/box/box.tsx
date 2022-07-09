import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IBox } from '../../sections/flow/flow';

interface IDiv{
}

const Div = styled.div<IDiv>`
z-index: 1;
position: absolute;
top:0;
left:0;
width: 11.2rem;
height: 7rem;
background-color: white;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
&:hover{
    background-color: rgb(245,245,245);
}
`

const Title = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.5px solid rgb(220,220,220);
`

const Desc = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
`

const Icon = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 1rem; 
`

// background-color: #e5e5f7;
// opacity: 0.8;
// background-image:  linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px);
// background-size: 20px 20px;

const Box = ({ item, paletteRef }: { item: IBox, paletteRef: RefObject<HTMLDivElement> }) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    const onMouseDown = (event: React.MouseEvent) => {
        if (!divRef.current || !paletteRef.current) return;
        const box = divRef.current;
        const palette = paletteRef.current;

        const shiftX = event.clientX - box.getBoundingClientRect().left;
        const shiftY = event.clientY - box.getBoundingClientRect().top;

        //box바운딩박스 레프트 탑을 확인해보자

        box.style.zIndex = '3';

        const moveAt = (event: MouseEvent) => {
            box.style.left = Math.round((event.pageX - shiftX) / palette.offsetWidth * 100) + '%';
            box.style.top = Math.round((event.pageY - palette.offsetTop - shiftY) / palette.offsetHeight * 100) + '%';
        };

        document.addEventListener('mousemove', moveAt);

        box.onmouseup = ((event: MouseEvent) => {
            document.removeEventListener('mousemove', moveAt);
            box.style.zIndex = '1';
            box.onmouseup = null;
        });

        box.onmouseleave = ((event: MouseEvent) => {
            document.removeEventListener('mousemove', moveAt);
            box.style.zIndex = '1';
            box.onmouseup = null;
        });
        
        box.ondragstart = ((event: MouseEvent) => {
            event.preventDefault();
        });
    };


    useEffect(() => {
        if (!divRef.current || !paletteRef.current) return;
        const box = divRef.current;
        const palette = paletteRef.current;

        const shiftX = box.offsetWidth / 2;
        const shiftY = box.offsetHeight / 2;

        box.style.left = Math.round((item.x - shiftX) / palette.offsetWidth * 100) + '%';
        box.style.top = Math.round((item.y - palette.offsetTop - shiftY) / palette.offsetHeight * 100) + '%';
    }, []);

    return (
        <Div
            ref={divRef}
            onMouseDown={onMouseDown}>
            <Title>
                <Icon>
                    <FontAwesomeIcon icon={faDatabase} />
                </Icon>
                <p>title</p>
            </Title>
            <Desc>
                <p>description</p>
            </Desc>
        </Div>
    );
};

export default Box;