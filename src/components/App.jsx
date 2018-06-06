import React, { Component } from 'react';
import styled from 'styled-components';

import reducer from '../reducer';
import { FRAMES_PER_SECOND, GAME_DIMENSIONS } from '../constants';
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
      '#3A506B',
      '#0B132B',
      (initialSpeed - minSpeed) / (maxSpeed - minSpeed),
    ),
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
    if ((this.frameCount * dotsPerSecond) % FRAMES_PER_SECOND === 0) {
      this.addDot();
    }
    this.frameCount += 1;
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
