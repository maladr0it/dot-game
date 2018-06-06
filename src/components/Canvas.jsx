import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GAME_DIMENSIONS } from '../constants';
import Theme from '../theme';
import Dot from './Dot';

const viewBox = [0, 0, ...GAME_DIMENSIONS];
const Canvas = ({ dots, handleDotClick, backgroundColor }) => (
  <Container>
    <StyledSvg viewBox={viewBox} backgroundColor={backgroundColor}>
      {Object.entries(dots).map(([id, data]) => (
        <Dot
          key={id}
          id={id}
          {...data}
          handleClick={handleDotClick}
          backgroundColor={backgroundColor}
        />
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
  backgroundColor: PropTypes.string.isRequired,
};
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  text-align: center;
`;
const StyledSvg = styled.svg.attrs({
  style: ({ backgroundColor }) => ({
    background: backgroundColor,
  }),
})`
  height: 100%;
  outline: 1px solid ${Theme.pastelYellow}
  width: auto;
`;
