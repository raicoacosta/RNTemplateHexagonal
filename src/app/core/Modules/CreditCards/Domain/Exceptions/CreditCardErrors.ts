/**
 * Excepciones de dominio para el módulo de tarjetas de crédito
 * Permiten un manejo de errores más específico y semántico
 */

export class CreditCardDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreditCardDomainError';
  }
}

export class CreditCardNotFoundError extends CreditCardDomainError {
  constructor(productNumber: string) {
    super(`Credit card with product number ${productNumber} not found`);
    this.name = 'CreditCardNotFoundError';
  }
}

export class CreditCardValidationError extends CreditCardDomainError {
  constructor(message: string) {
    super(`Validation error: ${message}`);
    this.name = 'CreditCardValidationError';
  }
}

export class CreditCardRepositoryError extends CreditCardDomainError {
  constructor(message: string, public readonly originalError?: unknown) {
    super(`Repository error: ${message}`);
    this.name = 'CreditCardRepositoryError';
  }
}

export class InvalidProductNumberError extends CreditCardValidationError {
  constructor(productNumber: string) {
    super(`Invalid product number format: ${productNumber}`);
    this.name = 'InvalidProductNumberError';
  }
}

export class InvalidMoneyAmountError extends CreditCardValidationError {
  constructor(amount: number) {
    super(`Invalid money amount: ${amount}. Must be positive`);
    this.name = 'InvalidMoneyAmountError';
  }
}

export class CurrencyMismatchError extends CreditCardValidationError {
  constructor(currency1: string, currency2: string) {
    super(`Cannot operate with different currencies: ${currency1} and ${currency2}`);
    this.name = 'CurrencyMismatchError';
  }
}
