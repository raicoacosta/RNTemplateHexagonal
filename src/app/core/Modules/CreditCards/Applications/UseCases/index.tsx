import React from 'react';
import {GetAllCreditCardsUseCase} from './GetAllCreditCards/GetAllCreditCardsUseCase';
import {GetCreditCardByIdUseCase} from './GetCreditCardById/GetCreditCardByIdUseCase';
import {CreateCreditCardUseCase} from './CreateCreditCard/CreateCreditCardUseCase';
import {DeleteCreditCardUseCase} from './DeleteCreditCard/DeleteCreditCardUseCase';
import {ICreditCardRepository} from '../../Domain/Ports/ICreditCardRepository';
import {MockCreditCardRepository} from '../../Infrastructure/Repositories/MockCreditCardRepository';
import {ILogger} from '@core/Infrastructure/Contracts/Logger.interface';
import {logger} from '@core/Infrastructure/Logger/LoggerService';

const {createContext, useContext} = React;

/**
 * Contexto con todos los casos de uso del módulo CreditCards
 */
interface CreditCardUseCases {
  getAllCreditCards: GetAllCreditCardsUseCase;
  getCreditCardById: GetCreditCardByIdUseCase;
  createCreditCard: CreateCreditCardUseCase;
  deleteCreditCard: DeleteCreditCardUseCase;
}

/**
 * Factory para crear los casos de uso con sus dependencias
 */
const createCreditCardUseCases = (
  repository: ICreditCardRepository,
  loggerService: ILogger,
): CreditCardUseCases => {
  return {
    getAllCreditCards: new GetAllCreditCardsUseCase(repository, loggerService),
    getCreditCardById: new GetCreditCardByIdUseCase(repository, loggerService),
    createCreditCard: new CreateCreditCardUseCase(repository, loggerService),
    deleteCreditCard: new DeleteCreditCardUseCase(repository, loggerService),
  };
};

// Crear instancias con dependencias inyectadas
// TODO: Cambiar a HttpCreditCardRepository cuando se conecte a API real
const repository: ICreditCardRepository = new MockCreditCardRepository();
const creditCardUseCases = createCreditCardUseCases(repository, logger);

const CreditCardUseCasesContext = createContext<CreditCardUseCases>(creditCardUseCases);

/**
 * Provider para los casos de uso de CreditCards
 */
const CreditCardUseCaseProvider = ({children}: {children: React.ReactElement}) => {
  return (
    <CreditCardUseCasesContext.Provider value={creditCardUseCases}>
      {children}
    </CreditCardUseCasesContext.Provider>
  );
};

/**
 * Hook para acceder a los casos de uso
 */
export const useCreditCardUseCases = () => {
  return useContext(CreditCardUseCasesContext);
};

// Mantener compatibilidad con código existente
export const useCreditCardImpl = () => {
  const useCases = useContext(CreditCardUseCasesContext);
  return {
    executeGetAll: () => useCases.getAllCreditCards.execute(),
  };
};

export default CreditCardUseCaseProvider;
