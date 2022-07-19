import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { setEnd, setStart } from '../features/flow/flowSlice';

interface IButton{
    index: number,
}

const Button = styled.button<IButton>`
position: absolute;
${({index}) => {
    switch (index) {
        case 0:
            return `
            top: 0;
            left: 50%;
            `;
        case 1:
            return `
            top: 50%;
            left: 100%;
            `;
        case 2:
            return `
            top: 100%;
            left: 50%;
            `;
        case 3:
            return `
            top: 50%;
            left: 0;
            `;
    }
}}
width: 10px;
height: 10px;
background-color: black;
transform: translate(-50%, -50%);
`

const FlowBtns = ({ index }: { index: number }) => {
    const btnArr = [0, 1, 2, 3];
    const dispatch = useAppDispatch();
    const onMouseDown = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(setStart([index, Number(event.currentTarget.id)]));
        dispatch(setEnd([])); // chart에서 초기화 해줄지 고민되네
    }
    const onMouseUp = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(setEnd([index, Number(event.currentTarget.id)]));
    }

    return (
        <>
            {btnArr.map((value, index) =>
                <Button
                    key={index}
                    id={`${index}`}
                    index={index}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                />
            )}
        </>
    );
};

export default FlowBtns;