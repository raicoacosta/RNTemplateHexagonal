import {IStorage} from '@core/Infrastructure/Contracts/Storage.interface';
import React from 'react';
import AsyncStorageImplementation from './AsyncStorage.implementation';

const {createContext, useContext} = React;

export const asyncStorageImpl: IStorage = new AsyncStorageImplementation();

const AsyncStorageImplContext = createContext<IStorage>(asyncStorageImpl);

const AsyncStorageImplementationProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <AsyncStorageImplContext.Provider value={asyncStorageImpl}>
      {children}
    </AsyncStorageImplContext.Provider>
  );
};

export const useAsyncStorageImpl = () => {
  return useContext(AsyncStorageImplContext);
};

export default AsyncStorageImplementationProvider;
