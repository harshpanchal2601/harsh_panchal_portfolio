"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SplashContextType {
  isSplashActive: boolean;
  completeSplash: () => void;
}

const SplashContext = createContext<SplashContextType>({
  isSplashActive: true,
  completeSplash: () => {},
});

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [isSplashActive, setIsSplashActive] = useState(true);

  const completeSplash = () => {
    setIsSplashActive(false);
  };

  // Optional failsafe: if something goes wrong, remove splash after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashActive(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SplashContext.Provider value={{ isSplashActive, completeSplash }}>
      {children}
    </SplashContext.Provider>
  );
}

export const useSplash = () => useContext(SplashContext);
