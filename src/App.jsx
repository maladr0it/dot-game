import React, { Component } from 'react';
import styled from 'styled-components';

import GameControls from './GameControls';
import Canvas from './Canvas';

import { FRAMES_PER_SECOND, GAME_DIMENSIONS } from './constants';
import { randomRange } from './utils';

class App extends Component {
  state = {
    playing: false,
    dots: {},
    frameCount: 0,
  };
  gameInterval = null;
  globalId = 0; // uuid generator could be used instead
  startGame = () => {
    this.gameInterval = setInterval(() => this.updateGame(), 1000 / FRAMES_PER_SECOND);
    this.setState({
      playing: true,
    });
  };
  pauseGame = () => {
    clearInterval(this.gameInterval);
    this.setState({
      playing: false,
    });
  };
  togglePlay = () => {
    if (this.state.playing) {
      this.pauseGame();
    } else {
      this.startGame();
    }
  };
  addDot = () => {
    const diam = randomRange(10, 100);
    // give a diam/2 buffer on both sides to avoid dot hanging off the edge
    const x = randomRange(diam / 2, GAME_DIMENSIONS[0] - diam / 2);
    // move the dot upward so it spawns just off-screen
    const y = 0;
    // const y = 0 - diam / 2;
    const speed = 10;
    const newDot = {
      x,
      y,
      diam,
      speed,
    };
    this.setState(
      prevState => ({
        dots: {
          ...prevState.dots,
          [this.globalId]: newDot,
        },
      }),
      () => {
        this.globalId = this.globalId + 1;
      },
    );
  };
  advanceDots = dots =>
    Object.entries(dots).reduce((acc, [id, data]) => {
      acc[id] = {
        ...data,
        y: data.y + data.speed,
      };
      return acc;
    }, {});
  updateGame = () => {
    const newDots = this.advanceDots(this.state.dots);
    this.setState(prevState => ({
      frameCount: prevState.frameCount + 1,
      dots: newDots,
    }));
  };
  render() {
    return (
      <Container>
        <button onClick={() => this.addDot()}>ADD</button>
        <button onClick={() => console.log(this.state)}>PEEK_STATE</button>
        <GameControls
          frameCount={this.state.frameCount}
          playing={this.state.playing}
          handleToggle={() => this.togglePlay()}
        />
        <Canvas dots={this.state.dots} count={this.state.count} />
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

// dispatch: (action) => {
//   this.setState(state => reducer(state, action));
// },
