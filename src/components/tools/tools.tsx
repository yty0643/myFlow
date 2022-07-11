import React from 'react';
import styled from 'styled-components';
import Tool from '../tool/tool';

const Div = styled.div`
width: 100%;
overflow-y: scroll;
`

const Tools = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <Div>
            {arr.map((item, index) =>
                <Tool key={index} />
            )}
        </Div>
    );
};

export default Tools;