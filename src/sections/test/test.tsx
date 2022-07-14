import { darken, lighten } from 'polished';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Sec = styled.section`
position: relative;
width: 1000px;
height: 100vh;
background-color: rgb(240,240,240);
`

const Canvas = styled.canvas`
width: 500px;
height: 300px;
background-color: rgb(230,230,230);
`

const Btn = styled.button`
z-index: 1;
position: absolute;
top: 0;
width: 1rem;
height: 1rem;
background-color: skyblue;
&:hover{
    background-color: ${lighten(0.5,"skyblue")};
}
`

const Test = () => {
    const cvRef = useRef<HTMLCanvasElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const onMouseDown = (event: React.MouseEvent) => {
        if (!cvRef.current || !btnRef.current) return;
        const canvas = cvRef.current;
        const button = btnRef.current;

        const startX = event.pageX - canvas.getBoundingClientRect().left;
        const startY = event.pageY;

        const mouseMove = (event: MouseEvent) => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const ratioX = canvas.width / canvas.getBoundingClientRect().width;
            const ratioY = canvas.height / canvas.getBoundingClientRect().height;
            const endX = (event.pageX - canvas.getBoundingClientRect().left) * ratioX;
            const endY = event.pageY * ratioY;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        };

        document.addEventListener('mousemove', mouseMove);

        button.onmouseup = () => {
            document.removeEventListener('mousemove', mouseMove);
        };
    };

    return (
        <Sec>
            <Canvas ref={cvRef} width='300px' height='300px'/>
            <Btn ref={btnRef} style={{ left: '0' }} onMouseDown={onMouseDown} />
        </Sec>
    );
};

export default Test;