export const DISPLAY_SIGNUP = 'DISPLAY_SIGNUP';

const setDisplaySignUp = (action, state) => {
  return { ...state, displaySignUp: action.displaySignUpBoolean };
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_SIGNUP:
      return setDisplaySignUp(action, state);
    default:
      return state;
  };
};
