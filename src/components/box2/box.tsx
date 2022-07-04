import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './box.module.css';

interface ICoord{
    x: number,
    y: number,
};

const Box = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [clickCoord, setClickCoord] = useState<ICoord>({x:0, y:0});
    const [mouseCoord, setMouseCoord] = useState<ICoord>({x:0, y:0});
    const [isClick, setIsClick] = useState<boolean>(false);

    const mouseMove = useCallback((event: MouseEvent): void => {
        setMouseCoord({
            x: event.clientX,
            y: event.clientY,
        });
    }, []);

    useEffect(() => {
        if (isClick)
            window.addEventListener("mousemove", mouseMove);
        else
            window.removeEventListener("mousemove", mouseMove );
    }, [isClick]);

    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.left = mouseCoord.x-clickCoord.x + 'px';
        divRef.current.style.top = mouseCoord.y-clickCoord.y + 'px';
    }, [mouseCoord]);

    return (
        <div
            ref={divRef}
            className={styles.box}
            onMouseDown={(event) => {
                setIsClick(true);
                setClickCoord({
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                });
            }}
            onMouseUp={() => { setIsClick(false) }}
        >
        </div>
    );
};

export default Box;