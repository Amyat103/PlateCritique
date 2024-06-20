import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const PictureContext = createContext();

export function PictureReducer(state, action) {
  switch (action.type) {
    case 'SET_POST':
      return {
        picture: action.payload,
      };
    case 'CREATE_POST':
      return {
        picture: [action.payload, ...state.picture],
      };
    case 'DELETE_POST':
      return {
        picture: state.picture.filter(
          (each) => each._id !== action.payload._id
        ),
      };
    case 'UPDATE_POST':
      return {
        picture: state.picture.map((each) =>
          each._id === action.payload._id ? action.payload : each
        ),
      };
    default:
      return state;
  }
}

function PictureContextProvider({ children }) {
  const [state, dispatch] = useReducer(PictureReducer, {
    picture: null,
  });

  return (
    <PictureContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PictureContext.Provider>
  );
}

PictureContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PictureContextProvider;
