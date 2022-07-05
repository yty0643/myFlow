import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import Navbar from './sections/navbar/navbar';
import Sign from './sections/sign/sign';
import Flow from './sections/flow/flow';
import Slidebar from './sections/slidebar/sliderbar';
import { useAppSelector } from './app/hooks';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - (100vw - 100%));
`;

export interface IOnClick {
  (idx: number): void;
}

function App() {
  const [refArr] = useState<RefObject<HTMLElement>[]>(Array(2).fill(null).map(() => createRef()));
  const isDark = useAppSelector(state => state.theme.isActive);

  const onClick: IOnClick = (idx) => {
    refArr[idx].current?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDark={isDark} />
      <Div>
        <Navbar onClick={onClick} />
        <Sign secRef={refArr[0]}/>
        <Flow secRef={refArr[1]}/>
      </Div>
    </ThemeProvider>
  );
};

export default App;