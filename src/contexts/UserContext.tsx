import { createContext, useReducer, type ReactNode } from 'react';
import { AUTHENTICATED } from '@apptypes/user';
import type {
  UserContextState,
  IUserContext,
  ACTIONTYPE,
} from '@apptypes/user';

const initialState: UserContextState = {
  isAuthenticated: null,
};

const reducer = (state: UserContextState, action: ACTIONTYPE) => {
  const newState = { ...state };

  switch (action.type) {
    case AUTHENTICATED:
      newState.isAuthenticated = action.payload;
      break;
  }

  return newState;
};

export const UserContext = createContext<IUserContext>({
  ...initialState,
  setIsAuthenticated: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsAuthenticated = (payload: boolean | null) => {
    dispatch({
      type: AUTHENTICATED,
      payload,
    });
  };

  const context = {
    ...state,
    setIsAuthenticated: setIsAuthenticated,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
