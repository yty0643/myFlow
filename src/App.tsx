import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Slidebar from './sections/slidebar/sliderbar';
import Navbar from './sections/navbar/navbar';
import Flow from './sections/flow/flow';
import Sign from './sections/sign/sign';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Sign />
      <Flow />
      <Slidebar />
    </div>
  );
}

export default App;