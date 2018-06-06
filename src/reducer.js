import { GAME_DIMENSIONS, FRAMES_PER_SECOND } from './constants';
import { minSpeed, maxSpeed } from './config';
import { interpolateColors } from './utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DOT_ADDED': {
      const { id, data } = action;
      return {
        ...state,
        dots: {
          ...state.dots,
          [id]: data,
        },
      };
    }
    case 'ADVANCE_DOTS': {
      const { dots, gameSpeed } = state;
      const delta = gameSpeed / FRAMES_PER_SECOND;
      const newDots = Object.entries(dots).reduce((acc, [id, data]) => {
        // don't render a dot if it is beyond the game dimensions
        if (data.y > GAME_DIMENSIONS[1] + data.diam) {
          return acc;
        }
        acc[id] = {
          ...data,
          y: data.y + delta,
        };
        return acc;
      }, {});
      return {
        ...state,
        dots: newDots,
      };
    }
    case 'DOT_CAPTURED': {
      // don't capture if the game is paused
      if (!state.playing) {
        return state;
      }
      const { id } = action;
      // TODO: dangerous selector
      const reward = Math.round(state.dots[id].reward);
      const newState = { ...state };
      delete newState.dots[id];
      return {
        ...state,
        score: state.score + reward,
        lastReward: { id, reward },
      };
    }
    case 'GAME_SPEED_UPDATED': {
      const { speed } = action;
      const backgroundColor = interpolateColors(
        '#3A506B',
        '#0B132B',
        (speed - minSpeed) / (maxSpeed - minSpeed),
      );
      return {
        ...state,
        gameSpeed: speed,
        backgroundColor,
      };
    }
    case 'GAME_STARTED': {
      return {
        ...state,
        playing: true,
      };
    }
    case 'GAME_PAUSED': {
      return {
        ...state,
        playing: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;
