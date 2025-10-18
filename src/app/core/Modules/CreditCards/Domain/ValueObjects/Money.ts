import {CurrencyMismatchError, InvalidMoneyAmountError} from '../Exceptions/CreditCardErrors';

/**
 * Enum para las monedas soportadas
 */
export enum Currency {
  PEN = 'PEN',
  USD = 'USD',
  EUR = 'EUR',
}

/**
 * Value Object para representar dinero
 * Encapsula cantidad y moneda, garantiza operaciones válidas
 */
export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency,
  ) {}

  /**
   * Factory method para crear Money
   * @param amount Cantidad (debe ser positiva o cero)
   * @param currency Código de moneda
   * @throws InvalidMoneyAmountError si la cantidad es negativa
   */
  static create(amount: number, currency: Currency): Money {
    if (amount < 0) {
      throw new InvalidMoneyAmountError(amount);
    }
    return new Money(amount, currency);
  }

  /**
   * Crea un Money con valor cero
   */
  static zero(currency: Currency): Money {
    return new Money(0, currency);
  }

  /**
   * Suma dos cantidades de dinero
   * @throws CurrencyMismatchError si las monedas no coinciden
   */
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  /**
   * Resta dos cantidades de dinero
   * @throws CurrencyMismatchError si las monedas no coinciden
   * @throws InvalidMoneyAmountError si el resultado es negativo
   */
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new InvalidMoneyAmountError(result);
    }
    return new Money(result, this.currency);
  }

  /**
   * Multiplica por un factor
   */
  multiply(factor: number): Money {
    if (factor < 0) {
      throw new InvalidMoneyAmountError(this.amount * factor);
    }
    return new Money(this.amount * factor, this.currency);
  }

  /**
   * Verifica si es mayor que otro Money
   */
  isGreaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  /**
   * Verifica si es menor que otro Money
   */
  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount < other.amount;
  }

  /**
   * Verifica si es igual a otro Money
   */
  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  /**
   * Verifica si el monto es cero
   */
  isZero(): boolean {
    return this.amount === 0;
  }

  /**
   * Obtiene la cantidad
   */
  getAmount(): number {
    return this.amount;
  }

  /**
   * Obtiene la moneda
   */
  getCurrency(): Currency {
    return this.currency;
  }

  /**
   * Formatea el dinero para display
   */
  format(): string {
    const formatted = this.amount.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${this.currency} ${formatted}`;
  }

  /**
   * Verifica que dos Money tengan la misma moneda
   */
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new CurrencyMismatchError(this.currency, other.currency);
    }
  }

  /**
   * Representación como string
   */
  toString(): string {
    return this.format();
  }
}
