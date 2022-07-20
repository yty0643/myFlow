import React, { RefObject, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const Flow = ({ canvasRef, start, end }: { canvasRef: RefObject<HTMLCanvasElement>, start: Element, end: Element }) => {
    const symbols = useAppSelector(state => state.symbols.symbols);

    useEffect(() => {
        
    });

    return (
        <div></div>
    );
};

export default Flow;