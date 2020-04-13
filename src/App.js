/*global chrome*/

import React, {useEffect} from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="heading">Declutter me</h1>
        <div className="buttons">
        <a id="closeOne">1</a>
        <a id="closeThree">3</a>
        <a id="closeAll">All</a> 
        </div>
        <a className="openall" id="openAll">Open All</a>
        <a className="clearStorage" id="clearStorage">Clear Storage</a>
        </header>
    </div>
  );
}

export default App;
