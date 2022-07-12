import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ISymbol, setSymbols } from '../../features/symbols/symbolsSlice';

const Div = styled.div`
width: 100%;
overflow-y: scroll;
`;

const Styles = () => {
    const symbols = useAppSelector(state => state.symbols.symbols);
    const selectedIdx = useAppSelector(state => state.selected.index);
    const dispatch = useAppDispatch();
    const ref = useRef<(HTMLInputElement | null)[]>([]);
    
    const onChange = (index: number) => {
        const key = ref.current[index]!.id;
        const value = ref.current[index]!.value;
        
        const temp: ISymbol[] = [...symbols];
        const values = {
            ...temp[selectedIdx].values,
            [key]: value,
        };
        temp[selectedIdx] = {
            ...temp[selectedIdx],
            values: {
                ...values,
                [key]:value,
            },
        };

        dispatch(setSymbols(temp));
    };

    return (
        <Div>
            <p>Index: {selectedIdx}</p>
            {symbols && Object.keys(symbols[selectedIdx].values).map((key, index) => (
                <div key={index}>
                    <p>{key}</p>
                    <input
                        ref={el => ref.current[index] = el}
                        type="text"
                        id={key}
                        defaultValue={symbols[selectedIdx].values[key]}
                        onChange={() => { onChange(index) }} />
                </div>
            ))}
        </Div>
    );
};

export default Styles;