import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import {
  Theme,
  AppState,
  IAppContext,
  ACTIONTYPE,
  TOGGLE_THEME,
} from '@src/types/app';

const LOCAL_STORAGE_APP_CONTEXT_KEY = 'appContext';

const savedAppContext = localStorage.getItem(LOCAL_STORAGE_APP_CONTEXT_KEY);

let savedAppContextValues;

if (savedAppContext != null) {
  savedAppContextValues = JSON.parse(savedAppContext);
}

const setTheme = (theme: Theme): void => {
  if (theme === Theme.DARK) {
    document.documentElement.classList.add('tw-dark');
  } else {
    document.documentElement.classList.remove('tw-dark');
  }
};

const theme =
  savedAppContextValues?.theme !== undefined
    ? (savedAppContextValues?.theme as Theme)
    : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT;

setTheme(theme);

const initialState: AppState = {
  theme,
};

localStorage.setItem(
  LOCAL_STORAGE_APP_CONTEXT_KEY,
  JSON.stringify(initialState),
);

const reducer = (state: AppState, action: ACTIONTYPE) => {
  const newState = { ...state };

  switch (action.type) {
    case TOGGLE_THEME:
      newState.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      setTheme(newState.theme);

      break;
  }

  localStorage.setItem(LOCAL_STORAGE_APP_CONTEXT_KEY, JSON.stringify(newState));
  return newState;
};

export const AppContext = createContext<IAppContext>({
  ...initialState,
  toggleTheme: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  const context = {
    ...state,
    toggleTheme: toggleTheme,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
