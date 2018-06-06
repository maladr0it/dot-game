import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { minSpeed, maxSpeed } from '../config';
import Theme from '../theme';

const SpeedSlider = ({ gameSpeed, updateGameSpeed }) => (
  <Container>
    <StyledSlider
      type="range"
      name="slider"
      min={minSpeed}
      max={maxSpeed}
      value={gameSpeed}
      onChange={e => updateGameSpeed(parseInt(e.target.value, 10))}
    />
    <StyledLabel htmlFor="slider">speed</StyledLabel>
  </Container>
);
export default SpeedSlider;

SpeedSlider.propTypes = {
  gameSpeed: PropTypes.number.isRequired,
  updateGameSpeed: PropTypes.func.isRequired,
};
const Container = styled.div`
  width: 100%;
`;
const StyledLabel = styled.label`
  color: ${Theme.pastelYellow};
`;
const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  padding: 0;
  margin-bottom: 0.75rem;

  &[type='range']:focus {
    outline: none;
  }
  &[type='range']:: -webkit-slider-runnable-track {
    -webkit-appearance: none;
    user-select: none;
    width: 100%;
    height: 0.1rem;
    background: ${Theme.pastelGreen};
  }
  &[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.5rem;
    width: 1.5rem;
    margin-top: -0.7rem;
    cursor: pointer;
    position: relative;
    border-radius: 2px;
    background: ${Theme.pastelGreen};
    border: 1px solid ${Theme.deepNavy};
  }
`;
