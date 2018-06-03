import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// HERE: make this a component with local slider state to avoid pingas
const SpeedSlider = ({ gameSpeed, updateGameSpeed }) => (
  <Container>
    <span>SPEED: {gameSpeed}</span>
    <StyledInput
      type="range"
      min="10"
      max="100"
      value={gameSpeed}
      onChange={e => updateGameSpeed(parseInt(e.target.value, 10))}
    />
    <br />
    <StyledInput type="range" />
  </Container>
);
export default SpeedSlider;

SpeedSlider.propTypes = {
  gameSpeed: PropTypes.number.isRequired,
  updateGameSpeed: PropTypes.func.isRequired,
};
const Container = styled.div`
  text-align: center;
`;
const StyledInput = styled.input`
  width: 90%;
`;
