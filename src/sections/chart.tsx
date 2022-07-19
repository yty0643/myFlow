import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Symbol from '../components/symbol';
import { setSymbols } from '../features/symbols/symbolsSlice';
import Toolbar from './toolbar';

const Section = styled.section`
position: relative;
display: flex;
margin-top: 100px; // section이 아래로 가는 상황 연출용임.
width: 100%;
height: 100vh;
background-color: grey;
`

const Chart = () => {
    const symbols = useAppSelector(state => state.symbols.symbols);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSymbols([{ x: 0, y: 0 }, { x: 100, y: 100 }])); //임시
    }, []);

    return (
        <Section>
            {symbols.map((value, index) =>
                <Symbol
                    key={index}
                    index={index}
                    value={value} />
            )}
            {/* <Toolbar /> */}
        </Section>
    );
};

export default Chart;