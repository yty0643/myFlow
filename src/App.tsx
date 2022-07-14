import React, { createRef, RefObject, useEffect, useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import Navbar from './sections/navbar/navbar';
import Sign from './sections/sign/sign';
import Flow from './sections/chart/chart';
import { useAppSelector } from './app/hooks';
import Test from './sections/test/test';

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
  const [focusIdx, setFocusIdx] = useState<number>(-1);
  
  const onClick: IOnClick = (idx) => {
    refArr[idx].current?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting)
  //         refArr.forEach((ref, index) => {
  //           if (ref.current == entry.target)
  //             setFocusIdx(index);
  //         });
  //     });
  //   }, {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.7,
  //   });

  //   refArr.forEach(ref => {
  //     observer.observe(ref.current!);
  //   });

  //   return () => {
  //     observer.disconnect();
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDark={isDark} />
      <Div>
        {/* <Navbar focusIdx={focusIdx} onClick={onClick} />
        <Sign secRef={refArr[0]}/>
        <Flow secRef={refArr[1]}/> */}
        <Test />
      </Div>
    </ThemeProvider>
  );
};

export default App;