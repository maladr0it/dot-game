import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Dot = ({
  id, x, y, diam, handleClick,
}) => (
  <StyledCircle cx={x} cy={y} r={diam / 2} onMouseDown={() => handleClick(id)} />
);
export default Dot;

const StyledCircle = styled.circle`
  fill: red;
`;
Dot.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  diam: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
