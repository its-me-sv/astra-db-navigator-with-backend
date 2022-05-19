import React, {createContext, ReactNode, useContext, useState} from 'react';

import {TypeSchema} from '../utils/types';
import {dummyTypes} from '../utils/dummy-data';

interface TypeContextInterface {
  types: Array<TypeSchema>;
  currType: TypeSchema | null
  loading: boolean;
  setCurrType?: (val: TypeSchema | null) => void;
  setLoading?: (val: boolean) => void;
  fetchTypes?: (val: string) => void;
  resetState?: () => void;
  addType?: (name: string, fields: number) => void;
  removeType?: (name: string) => void;
}

const defaultState: TypeContextInterface = {
  types: [],
  currType: null,
  loading: false,
};

export const TypeContext = createContext<TypeContextInterface>(defaultState);

export const useTypeContext = () => useContext(TypeContext);

export const TypeContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [types, setTypes] = useState<Array<TypeSchema>>(defaultState.types);
  const [currType, setCurrType] = useState<TypeSchema | null>(defaultState.currType);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const fetchTypes = (ksName: string) => {
    if (ksName.length < 1) return;
    setLoading(true);
    setTimeout(() => {
      setTypes(dummyTypes);
      setLoading(false);
    }, 500);
  };

  const addType = (name: string, fields: number) => {
    setTypes([...types, { name, fields }]);
  };

  const removeType = (typName: string) => {
    if (typName.length < 1) return;
    setTypes(types.filter(({name}) => name !== typName));
  };

  const resetState = () => {
    setTypes([]);
    setCurrType(null);
    setLoading(false);
  };

  return (
    <TypeContext.Provider
      value={{
        types, currType, loading,
        setCurrType, setLoading, fetchTypes,
        resetState, addType, removeType
      }}
    >{children}</TypeContext.Provider>
  );
};
