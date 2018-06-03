import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GAME_DIMENSIONS } from './constants';
import Dot from './Dot';

const viewBox = [0, 0, ...GAME_DIMENSIONS];
// TODO: won't maintain ratio at very narrow resolutions
const Canvas = ({ dots, handleDotClick }) => (
  <Container>
    <StyledSvg viewBox={viewBox} preserveAspectRatio="none">
      {Object.entries(dots).map(([id, data]) => (
        <Dot key={id} id={id} {...data} handleClick={handleDotClick} />
      ))}
    </StyledSvg>
  </Container>
);
export default Canvas;

Canvas.propTypes = {
  dots: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    diam: PropTypes.number.isRequired,
  })).isRequired,
  handleDotClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background: blue;
`;
// TODO: TRY TO INHERIT 100% HEIGHT
const StyledSvg = styled.svg`
  height: 90vh;
  width: auto;
  outline: 1px solid black;
  background: yellow;
`;
