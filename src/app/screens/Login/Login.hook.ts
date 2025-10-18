import {useCreditCardImpl} from '@core/Modules/CreditCards/Applications/UseCases';

export const LoginHook = () => {
  const _creditCardImpl = useCreditCardImpl();

  const login = () => {
    try {
      // TODO: Implementar lógica de login
    } catch (_error) {
      // TODO: Manejar error
    }
  };

  return {login};
};
