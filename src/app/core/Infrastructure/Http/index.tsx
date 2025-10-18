import {IHttp} from '@core/Infrastructure/Contracts/Http.interface';
import React from 'react';
import HttpImplementation from './Http.implementation';

const {createContext, useContext} = React;

export const httpImpl: IHttp = new HttpImplementation();
const HttpImplContext = createContext<IHttp>(httpImpl);

const HttpImplementationProvider = ({children}: {children: React.ReactElement}) => {
  return (
    <HttpImplContext.Provider value={httpImpl}>
      {children}
    </HttpImplContext.Provider>
  );
};

export const useHttpImpl = () => {
  return useContext(HttpImplContext);
};

export default HttpImplementationProvider;
