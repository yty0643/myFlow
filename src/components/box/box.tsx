import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { domainToUnicode } from 'url';
import { IBox, IOnClick } from '../../sections/flow/flow';

interface IDiv{
}

const Div = styled.div<IDiv>`
z-index: 1;
position: absolute;
top:0;
left:0;
width: 11.2rem;
height 7rem;
background-color: skyblue;
&:hover{
    background-color: rgb(220,220,220);
}
`

const Box = ({ item, paletteRef, onClick  }: { item: IBox, paletteRef: RefObject<HTMLDivElement>, onClick: IOnClick}) => {
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
            onMouseDown={onMouseDown}
            onClick={() => { onClick(divRef) }}>
            ddd
        </Div>
    );
};

export default Box;