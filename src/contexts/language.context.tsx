import React, {createContext, ReactNode, useContext, useState} from 'react';

interface LanguageContextInterface {
  language: number;
  setLanguage?: (val: number) => void;
}

const defaultState: LanguageContextInterface = {
  language: 0
};

export const LanguageContext = createContext<LanguageContextInterface>(defaultState);

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [lang, setLang] = useState<number>(defaultState.language);

  const setLanguage = (v: number) => {
    if (v === lang) return;
    setLang(v);
  };

  return (
    <LanguageContext.Provider value={{language: lang, setLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};