import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IBox } from '../../sections/flow/flow';
import Box from '../box/box';

const Div = styled.div`
    flex: 1 1 auto;
    position: relative;

`

const Palette = () => {
    const [boxes, setBoxes] = useState<IBox[]>([]);
    const paletteRef = useRef<HTMLDivElement>(null);

    const onDrop = (event: React.DragEvent) => {
        setBoxes((prev) => {
            const temp = [...prev];
            temp.push({
                x: event.pageX,
                y: event.pageY,
                title: "title",
                description: "description",
            });
            return temp;
        })
    }

    return (
        <Div
            ref={paletteRef}
            onDragOver={(event) => { event.preventDefault(); }}
            onDrop={onDrop}>
            {boxes.map((item, index) =>
                <Box key={index} item={item} paletteRef={paletteRef} />
            )}
        </Div>
    );
};

export default Palette;