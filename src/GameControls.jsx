import React from 'react';
import PropTypes from 'prop-types';

import SpeedSlider from './SpeedSlider';

const GameControls = ({
  playing, score, gameSpeed, updateGameSpeed, togglePlay,
}) => (
  <div>
    <span>SCORE: {Math.floor(score)}</span>
    <button onClick={() => togglePlay()}>{playing ? 'PAUSE' : 'PLAY'}</button>
    <SpeedSlider gameSpeed={gameSpeed} updateGameSpeed={updateGameSpeed} />
  </div>
);
export default GameControls;

GameControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  gameSpeed: PropTypes.number.isRequired,
  updateGameSpeed: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};
