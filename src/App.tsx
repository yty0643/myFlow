import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { darken, lighten } from 'polished';
import Box from './components/box/box';


function App() {
  return (
    <ThemeProvider
      theme={theme}>
      <Box />
      <Box color="white"/>
      <Box color="black"/>
    </ThemeProvider>
  );
}

export default App;