import React from 'react';
import styled from 'styled-components';

import Dot from './Dot';
import { GAME_DIMENSIONS } from './constants';

const viewBox = [0, 0, ...GAME_DIMENSIONS];
// TODO: won't maintain ratio at very narrow resolutions
const Canvas = ({ dots }) => {
  const renderedDots = Object.entries(dots).map(([id, data]) => <Dot key={id} {...data} />);
  return (
    <Container>
      <Svg viewBox={viewBox} preserveAspectRatio="none">
        {renderedDots}
      </Svg>
    </Container>
  );
};
export default Canvas;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background: blue;
`;
// TODO: TRY TO INHERIT 100% HEIGHT
const Svg = styled.svg`
  height: 90vh;
  width: auto;
  outline: 1px solid black;
  background: yellow;
`;
