import React, { useRef } from 'react';
import { IOnClick } from '../../sections/navbar/navbar';

const SecBtn = ({ onClick }: { onClick: IOnClick }) => {
    
    return (
        <button onClick={() => { onClick() }}>
            signIn
        </button>
    );
};

export default SecBtn;