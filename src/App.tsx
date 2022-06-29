import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Box from './components/box/box';

function App() {
  return (
    <div className={styles.app}>
      <Box />
    </div>
  );
}

export default App;