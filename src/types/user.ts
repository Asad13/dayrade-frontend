export interface UserContextState {
  isAuthenticated: boolean | null;
}

export interface IUserContext extends UserContextState {
  setIsAuthenticated: (payload: boolean | null) => void;
}

export const AUTHENTICATED = 'IS_AUTHENTICATED';

export type ACTIONTYPE = {
  type: typeof AUTHENTICATED;
  payload: boolean | null;
}; // | { type: 'decrement'; payload: string };
