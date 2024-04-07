export const enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface AppState {
  theme: Theme;
}

export interface IAppContext extends AppState {
  toggleTheme: () => void; // React.Dispatch<React.SetStateAction<Theme>>
}

export const TOGGLE_THEME = 'TOGGLE_THEME';

export type ACTIONTYPE = { type: typeof TOGGLE_THEME }; // | { type: 'decrement'; payload: string };
