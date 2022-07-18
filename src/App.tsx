import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
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
  const isDark = useAppSelector(state => state.theme.isActive);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle isDark={isDark} />
      <Div>
        
      </Div>
    </ThemeProvider>
  );
};

export default App;