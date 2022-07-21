import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Flow from '../components/flow';
import Symbol from '../components/symbol';
import { pushFlows, setEnd, setFlows, setStart } from '../features/flows/flowsSlice';
import { setSymbols } from '../features/symbols/symbolsSlice';

const Section = styled.section`
position: relative;
display: flex;
margin-top: 100px; // section이 아래로 가는 상황 연출용임.
width: 100%;
height: 100vh;
background-color: grey;
`

const Canvas = styled.canvas`
background-color: rgb(240,240,240);
width: 100%;
height: 100%;
`

interface ICoord{
    x: number,
    y: number,
    shiftX: number,
    shiftY: number,
}

const Chart = () => {
    const dispatch = useAppDispatch();
    const symbols = useAppSelector(state => state.symbols.symbols);
    const flows = useAppSelector(state => state.flows.flows);
    const start = useAppSelector(state => state.flows.start);
    const end = useAppSelector(state => state.flows.end);
    const ref = useRef<HTMLElement>(null);
    const [refArr, setRefArr] = useState<RefObject<HTMLDivElement>[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const initFlow = (event: React.MouseEvent) => {
        dispatch(setStart([]));
        dispatch(setEnd([]));
    };

    const coordCalc: { (symbolIdx: number, btnIdx: number): ICoord} = (symbolIdx, btnIdx) => {
        let x = refArr[symbolIdx].current!.offsetLeft;
        let y = refArr[symbolIdx].current!.offsetTop;
        let shiftX = 0;
        let shiftY = 0;
        switch (btnIdx) {
            case 0:
                x += symbols[symbolIdx].width / 2;
                shiftY = -50;
                break;
            case 1:
                x += symbols[symbolIdx].width;
                y += symbols[symbolIdx].height / 2;
                shiftX = 50;
                break;
            case 2:
                x += symbols[symbolIdx].width / 2;
                y += symbols[symbolIdx].height;
                shiftY = 50
                break;
            case 3:
                y += symbols[symbolIdx].height / 2;
                shiftX = -50;
                break;
        }
        return { x, y, shiftX, shiftY }
    };

    useEffect(() => {
        const temp = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        }
        const temp2 = {
            x: 100,
            y: 100,
            width: 200,
            height: 100,
        }
        dispatch(setSymbols([temp, temp2]));
        dispatch(pushFlows());
        dispatch(pushFlows());
        setRefArr(prev => {
            const temp = [...prev];
            temp.push(createRef());
            return temp;
        })
        setRefArr(prev => {
            const temp = [...prev];
            temp.push(createRef());
            return temp;
        }) //여기까지 임시 데이터들
        const resize = () => {
            if (!ref.current) return;
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    useEffect(() => {
        if (start.length == 0 || end.length == 0) return;
        dispatch(setFlows({ start, end }));
    }, [start, end]);
    
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        flows.forEach((flow, symbolIdx) => {
            flow.forEach((value, btnIdx) => {
                if (value.length == 0) return;
                const start: ICoord = coordCalc(symbolIdx, btnIdx);
                const end: ICoord = coordCalc(value[0], value[1]);
                if (symbolIdx == value[0] && btnIdx == value[1]) return;
                ctx.moveTo(start.x, start.y);
                start.x += start.shiftX;
                start.y += start.shiftY;
                ctx.arcTo(start.x, start.y, end.x, start.y, 30);
                ctx.arcTo(end.x, start.y, end.x, end.y, 30);
                ctx.lineTo(end.x, end.y);
            });
        });
        ctx.stroke();
    }, [flows, symbols, width, height]);

    return (
        <Section
            ref={ref}
            onMouseDown={initFlow}
            onMouseUp={initFlow}
            onDragStart={() => { return false }}>
            <Canvas
                ref={canvasRef}
                width={width}
                height={height} />
            {symbols.map((value, index) =>
                <Symbol
                    key={index}
                    divRef={refArr[index]}
                    index={index}
                    value={value} />
            )}
        </Section>
    );
};

export default Chart;