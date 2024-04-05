import { createContext } from 'react';
export const AuthContext = createContext({
  user: {
    userId: '',
    username: '',
    role: '',
  },
  onSignOut: () => {},
  onSignIn: () => {},
});
