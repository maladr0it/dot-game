import React from 'react';
import styled from 'styled-components';

class RewardDisplay extends React.Component {
  // only update if a new dot has been captured
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }
  // using a ref to imperatively animate the component
  componentDidUpdate() {
    this.textEl.animate(
      [
        {
          opacity: 1,
          bottom: '0',
        },
        {
          opacity: 0,
          bottom: '5rem',
        },
      ],
      {
        duration: 400,
      },
    );
  }
  render() {
    return (
      <Container>
        <div
          style={{ position: 'relative', opacity: 0 }}
          ref={(el) => {
            this.textEl = el;
          }}
        >
          <StyledText>+{this.props.reward}</StyledText>
        </div>
      </Container>
    );
  }
}
export default RewardDisplay;

const Container = styled.div`
  pointer-events: none;
  z-index: 10;
  left: 50%;
  top: 50%;
  position: fixed;
`;
const StyledText = styled.div`
  position: relative;
  text-align: center;
  left: -50%;
  font-size: 3rem;
  color: #ffee93;
`;
