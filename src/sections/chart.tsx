import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Flow from '../components/flow';
import Symbol from '../components/symbol';
import { delFlows, pushFlows, setEnd, setFlows, setStart } from '../features/flows/flowsSlice';
import { setSymbols } from '../features/symbols/symbolsSlice';
import { faBars, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import CanvasBtn from '../components/canvas_btn';

interface ISection{
    scale: number;
}

const Section = styled.section<ISection>`
position: relative;
display: flex;
margin-top: 100px; // section이 아래로 가는 상황 연출용임.
width: 100%;
height: 100vh;
${({ scale }) => `
transform: scale(0.7)

`}
`


const Canvas = styled.canvas`
background-color: transparent;
width: 100%;
height: 100%;
// background-color: grey;

// background-repeat: repeat;
background-color: #fff;
// min-height: 50vh;

background-image: linear-gradient(to bottom, transparent, transparent 20%, #fff 20%, #fff 90%, transparent 90%),
linear-gradient(to right, transparent, transparent 20%, #fff 20%, #fff 90%, transparent 90%),
linear-gradient(to right, #eee, #eee 20%, #fff 20%, #fff 90%, #eee 90%);
background-size: 10px 10px; 
`

const Btns = styled.div`
position: absolute;
top: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;
`

interface ICoord{
    x: number,
    y: number,
}

const Chart = () => {
    const dispatch = useAppDispatch();
    const symbols = useAppSelector(state => state.symbols.symbols);
    const flows = useAppSelector(state => state.flows.flows);
    const start = useAppSelector(state => state.flows.start);
    const end = useAppSelector(state => state.flows.end);
    const ref = useRef<HTMLElement>(null);
    const [scale, setScale] = useState<number>(1);
    const [refArr, setRefArr] = useState<RefObject<HTMLDivElement>[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const initFlow = (event: React.MouseEvent) => {
        dispatch(setStart([]));
        dispatch(setEnd([]));
    };

    const coordCalc: { (symbolIdx: number, btnIdx: number): ICoord } = (symbolIdx, btnIdx) => {
        let x = refArr[symbolIdx].current!.offsetLeft;
        let y = refArr[symbolIdx].current!.offsetTop;
        switch (btnIdx) {
            case 0:
                x += symbols[symbolIdx].width / 2;
                break;
            case 1:
                x += symbols[symbolIdx].width / 2;
                y += symbols[symbolIdx].height;
                break;
        }
        return { x, y }
    };

    const zoomIn = () => {
        setScale((prev) => {
            if (prev >= 1.3)
                return prev;
            else
                return prev + 0.1;
        })
    }
    const zoomOut = () => {
        setScale((prev) => {
            if (prev <= 0.7)
                return prev;
            else
                return prev - 0.1;
        })
    }
    const menuToggle = () => {
        console.log("menuToggle");
    }
    useEffect(() => { 
        console.log("H");
    }, [scale]);

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
        const temp3 = {
            x: 100,
            y: 100,
            width: 200,
            height: 100,
        }
        dispatch(setSymbols([temp, temp2, temp3]));
        dispatch(pushFlows());
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
        if (start[0] != end[0] && start[1] == end[1]) return;
        if (start[1] == end[1])
            dispatch(delFlows({ start }));
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
                value.forEach((val) => {
                    if (symbolIdx == val[0] && btnIdx == val[1]) return;
                    let start: ICoord;
                    let end: ICoord;
                    let startShiftY;
                    let endShiftY;
                    if (btnIdx == 0) {
                        start = coordCalc(val[0], val[1]);
                        end = coordCalc(symbolIdx, btnIdx);
                    } else {
                        start = coordCalc(symbolIdx, btnIdx);
                        end = coordCalc(val[0], val[1]);
                    }
                    if (start.y - end.y >= 0) {
                        startShiftY = 30;
                        endShiftY = 30;
                    } else {
                        startShiftY = Math.abs(start.y - end.y) / 2;
                        endShiftY = Math.abs(start.y - end.y) / 2;
                    }
                    let startY = start.y + startShiftY;
                    let endY = end.y - endShiftY;
                    ctx.moveTo(start.x, start.y);
                    ctx.arcTo(start.x, startY, end.x, endY, 10);
                    ctx.arcTo(end.x, endY, end.x, end.y, 10);
                    ctx.lineTo(end.x, end.y);
                });
            });
        });
        ctx.stroke();
    }, [flows, symbols, width, height]);

    return (
        <Section
            ref={ref}
            scale={scale}
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
            <Btns>
                <CanvasBtn icon={faPlus} onClick={zoomIn} />
                <CanvasBtn icon={faMinus} onClick={zoomOut} />
                <CanvasBtn icon={faBars} onClick={menuToggle} />
            </Btns>
        </Section>
    );
};

export default Chart;