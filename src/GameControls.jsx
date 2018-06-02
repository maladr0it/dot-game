import React from 'react';

const GameControls = ({ playing, frameCount, handleToggle }) => (
  <div>
    <button onClick={() => handleToggle()}>{playing ? 'PAUSE' : 'START'}</button>
    <div>FRAME_NUMBER: {frameCount}</div>
  </div>
);
export default GameControls;
