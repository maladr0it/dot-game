import React, { Component } from 'react';
import styled from 'styled-components';

import reducer from './reducer';
import GameControls from './GameControls';
import Canvas from './Canvas';

import {
  FRAMES_PER_SECOND,
  GAME_DIMENSIONS,
  minDiam,
  maxDiam,
  minReward,
  maxReward,
} from './constants';
import { randomRange } from './utils';

class App extends Component {
  state = {
    playing: false,
    score: 0,
    dots: {},
    gameSpeed: 70,
  };
  frameCount = 0;
  gameInterval = null; // reference for clearInterval()
  globalId = 0; // uuid generator could be used instead
  dispatch = (action) => {
    this.setState(prevState => reducer(prevState, action));
  };

  // actions to be passed as props
  togglePlay = () => (this.state.playing ? this.pauseGame() : this.startGame());
  captureDot = (id) => {
    this.dispatch({ type: 'DOT_CAPTURED', id });
  };
  updateGameSpeed = (speed) => {
    this.dispatch({ type: 'GAME_SPEED_UPDATED', speed });
  };

  // local actions
  startGame = () => {
    this.gameInterval = setInterval(() => this.updateGame(), 1000 / FRAMES_PER_SECOND);
    this.dispatch({ type: 'GAME_STARTED' });
  };
  pauseGame = () => {
    clearInterval(this.gameInterval);
    this.dispatch({ type: 'GAME_PAUSED' });
  };
  addDot = () => {
    const diam = randomRange(minDiam, maxDiam);
    // give a diam/2 buffer on both sides to avoid dot hanging off the edge
    const x = randomRange(diam / 2, GAME_DIMENSIONS[0] - diam / 2);
    // move the dot upward so it spawns just off-screen
    const y = -diam / 2;
    // magnitude of reward is inversely proporitonal to dot diameter
    const rewardScale = 1 - (diam - minDiam) / (maxDiam - minDiam);
    const reward = minReward + rewardScale * (maxReward - minReward);
    const id = this.globalId;
    this.globalId += 1;
    this.dispatch({
      type: 'DOT_ADDED',
      id,
      data: {
        x,
        y,
        diam,
        reward,
      },
    });
  };
  // core game-loop is here
  updateGame = () => {
    this.dispatch({ type: 'ADVANCE_DOTS' });
    if (this.frameCount % FRAMES_PER_SECOND === 0) {
      this.addDot();
    }
    this.frameCount += 1;
  };
  render() {
    return (
      <Container>
        <button onClick={() => console.log(this.state)}>PEEK_STATE</button>
        <GameControls
          playing={this.state.playing}
          score={this.state.score}
          gameSpeed={this.state.gameSpeed}
          updateGameSpeed={this.updateGameSpeed}
          togglePlay={this.togglePlay}
        />
        <Canvas dots={this.state.dots} handleDotClick={this.captureDot} />
      </Container>
    );
  }
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: red;
  height: 100%;
`;
