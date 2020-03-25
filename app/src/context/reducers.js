export const DISPLAY_SIGNUP = 'DISPLAY_SIGNUP';
export const CURRENT_USERNAME = 'CURRENT_USERNAME';

const setDisplaySignUp = (action, state) => {
  return { ...state, displaySignUp: action.displaySignUpBoolean };
};

const setCurrentUserName = (action, state) => {
  return {...state, currentUserName: action.currentUserNameValue };
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_SIGNUP:
      return setDisplaySignUp(action, state);
    case CURRENT_USERNAME:
      return setCurrentUserName(action, state);
    default:
      return state;
  };
};
