import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SpeedSlider from './SpeedSlider';

const GameControls = ({
  playing, score, gameSpeed, updateGameSpeed, togglePlay,
}) => (
  <React.Fragment>
    <TransparentOverlay />
    <Overlay>
      <Controls>
        <ScorePane>
          <Score>{score}</Score>
          <StartButton playing={playing} onClick={() => togglePlay()}>
            {playing ? 'Pause' : 'Play'}
          </StartButton>
        </ScorePane>
        <SpeedSlider gameSpeed={gameSpeed} updateGameSpeed={updateGameSpeed} />
      </Controls>
    </Overlay>
  </React.Fragment>
);
export default GameControls;

GameControls.propTypes = {
  playing: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  gameSpeed: PropTypes.number.isRequired,
  updateGameSpeed: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
};
const TransparentOverlay = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 8rem;
  background: black;
  opacity: 0.8;
`;
const Overlay = styled.div`
  z-index: 20;
  position: fixed;
  width: 100%;
  height: 8rem;
`;
const Controls = styled.div`
  max-width: 16rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const ScorePane = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;
const Score = styled.div`
  font-size: 3rem;
  color: #ffee93;
  width: 8rem;
`;
const StartButton = styled.button`
  border: none;
  font: inherit;
  outline: inherit;
  cursor: pointer;

  width: 8rem;
  padding: 10px;
  border-radius: 2px;
  background: none;
  outline: 2px solid ${props => (props.playing ? '#ffee93' : '#adf7b6')};
  color: ${props => (props.playing ? '#ffee93' : '#adf7b6')};
`;
