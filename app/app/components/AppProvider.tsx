'use client';

import { createContext, useContext } from 'react';
import { IAppContextType } from '../interfaces/interfaces';

const AppContext = createContext<IAppContextType | undefined>(undefined);

export function AppProvider({ children, value }: { children: React.ReactNode; value: IAppContextType }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}