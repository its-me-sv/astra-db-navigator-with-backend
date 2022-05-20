import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {TypeSchema} from '../utils/types';
import {extractTypes} from '../utils/extractors.utils';

import {useConnectionContext} from './connection.context';
import {useDatabaseContext} from './database.context';

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
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();

  const [types, setTypes] = useState<Array<TypeSchema>>(defaultState.types);
  const [currType, setCurrType] = useState<TypeSchema | null>(defaultState.currType);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const fetchTypes = (ksName: string) => {
    if (ksName.length < 1) return;
    setLoading(true);
    axios.post(
      `/.netlify/functions/fetch-types`, 
      {tkn, ksName, dbId: currDatabase.split('/')[0], dbRegion: currDatabase.split('/')[1]}
    )
    .then(({data}) => {
      setTypes(extractTypes(data.data));
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      toast.error(err.response.data);
    });
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
