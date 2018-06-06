import React, { Component } from 'react';
import styled from 'styled-components';

import reducer from '../reducer';
import { GAME_DIMENSIONS } from '../constants';
import {
  initialSpeed,
  minSpeed,
  maxSpeed,
  dotsPerSecond,
  minDiam,
  maxDiam,
  minReward,
  maxReward,
} from '../config';
import { randomRange, interpolateColors } from '../utils';
import Theme from '../theme';

import GameControls from './GameControls';
import Canvas from './Canvas';
import RewardDisplay from './RewardDisplay';

class App extends Component {
  state = {
    playing: false,
    score: 0,
    dots: {},
    gameSpeed: initialSpeed,
    lastReward: {},
    backgroundColor: interpolateColors(
      Theme.slateGray,
      Theme.deepNavy,
      (initialSpeed - minSpeed) / (maxSpeed - minSpeed),
    ),
  };

  frameId = null;
  currentTime = null;
  lastTime = null;
  delta = 0;
  lastDotTime = null;
  globalId = 0; // unique id for each dot
  // this is not part of state so it is synchronously updated

  dispatch = (action) => {
    this.setState(prevState => reducer(prevState, action));
  };
  togglePlay = () => (this.state.playing ? this.pauseGame() : this.startGame());
  captureDot = (id) => {
    this.dispatch({ type: 'DOT_CAPTURED', id });
  };
  updateGameSpeed = (speed) => {
    this.dispatch({ type: 'GAME_SPEED_UPDATED', speed });
  };
  startGame = () => {
    this.lastTime = new Date().getTime();
    this.lastDotTime = this.lastTime;
    this.updateGame();
    this.dispatch({ type: 'GAME_STARTED' });
  };
  pauseGame = () => {
    global.cancelAnimationFrame(this.frameId);
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
    this.frameId = global.requestAnimationFrame(this.updateGame);
    this.currentTime = new Date().getTime();
    this.delta = (this.currentTime - this.lastTime) / 1000;

    this.dispatch({ type: 'ADVANCE_DOTS', delta: this.delta });

    if (this.currentTime - this.lastDotTime > 1000 / dotsPerSecond) {
      this.addDot();
      this.lastDotTime = this.currentTime;
    }
    this.lastTime = this.currentTime;
  };
  render() {
    return (
      <Container>
        <GameControls
          playing={this.state.playing}
          score={this.state.score}
          gameSpeed={this.state.gameSpeed}
          updateGameSpeed={this.updateGameSpeed}
          togglePlay={this.togglePlay}
        />
        <RewardDisplay {...this.state.lastReward} />
        <Canvas
          dots={this.state.dots}
          handleDotClick={this.captureDot}
          backgroundColor={this.state.backgroundColor}
        />
      </Container>
    );
  }
}
export default App;

const Container = styled.div`
  height: 100%;
`;
