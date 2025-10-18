import React from 'react';
import {CreditCardUseCase} from './CreditCardUseCase';

const {createContext, useContext} = React;

export const creditCardImpl = new CreditCardUseCase();
const CreditCardContext = createContext(creditCardImpl);

const CreditCardUseCaseProvider = ({children}: {children: React.ReactElement}) => {
  return (
    <CreditCardContext.Provider value={creditCardImpl}>
      {children}
    </CreditCardContext.Provider>
  );
};

export const useCreditCardImpl = () => {
  return useContext(CreditCardContext);
};

export default CreditCardUseCaseProvider;
