import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Dot = ({
  id, x, y, diam, handleClick, backgroundColor,
}) => (
  <StyledCircle
    cx={x}
    cy={y}
    r={diam / 2}
    onMouseDown={() => handleClick(id)}
    backgroundColor={backgroundColor}
  />
);
export default Dot;

const pulse = keyframes`
  0% {
    stroke: #ADF7B6;
  }
  100% {
    stroke: #FFEE93;
  }
`;
const StyledCircle = styled.circle.attrs({
  fill: props => props.backgroundColor,
})`
  stroke-width: 3;
  animation: ${pulse} 0.37s linear 0s alternate infinite;
`;
Dot.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  diam: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
