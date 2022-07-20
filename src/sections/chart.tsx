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

    const coordCalc: { (symbolIdx: number, btnIdx: number): { x: number, y: number } | void } = (symbolIdx, btnIdx) => {
        let x = refArr[symbolIdx].current!.offsetLeft;
        let y = refArr[symbolIdx].current!.offsetTop;
        switch (btnIdx) {
            case 0:
                x += symbols[symbolIdx].width / 2;
                break;
            case 1:
                x += symbols[symbolIdx].width;
                y += symbols[symbolIdx].height / 2;
                break;
            case 2:
                x += symbols[symbolIdx].width / 2;
                y += symbols[symbolIdx].height;
                break;
            case 3:
                y += symbols[symbolIdx].height / 2;
                break;
        }
        return { x, y }
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
        })
        if (!ref.current) return;
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight)
    }, []);

    useEffect(() => {
        if (start.length == 0 || end.length == 0) return;
        dispatch(setFlows({ start, end }));
    }, [start, end]);
    
    useEffect(() => {
        flows.forEach((flow, symbolIdx) => {
            flow.forEach((value, btnIdx) => {
                if (value.length == 0) return;
                const start = coordCalc(symbolIdx, btnIdx);
                const end = coordCalc(value[0], value[1]);
                console.log(start, end);
            })
        })
    }, [flows]);

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