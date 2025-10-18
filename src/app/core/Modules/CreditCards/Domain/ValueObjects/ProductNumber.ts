import {InvalidProductNumberError} from '../Exceptions/CreditCardErrors';

/**
 * Value Object para el número de producto de una tarjeta de crédito
 * Encapsula las reglas de validación y garantiza inmutabilidad
 */
export class ProductNumber {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Factory method para crear un ProductNumber
   * @param value Número de producto como string
   * @returns Instancia válida de ProductNumber
   * @throws InvalidProductNumberError si el formato es inválido
   */
  static create(value: string): ProductNumber {
    if (!ProductNumber.isValid(value)) {
      throw new InvalidProductNumberError(value);
    }
    return new ProductNumber(value);
  }

  /**
   * Valida el formato del número de producto
   * Debe ser un string de 16 dígitos
   */
  private static isValid(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }
    // Verificar que tenga 16 dígitos
    const digitRegex = /^\d{16}$/;
    return digitRegex.test(value);
  }

  /**
   * Obtiene el valor del número de producto
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Obtiene una versión enmascarada del número (****-****-****-1234)
   */
  getMasked(): string {
    const lastFour = this.value.slice(-4);
    return `****-****-****-${lastFour}`;
  }

  /**
   * Obtiene solo los últimos 4 dígitos
   */
  getLastFourDigits(): string {
    return this.value.slice(-4);
  }

  /**
   * Verifica igualdad con otro ProductNumber
   */
  equals(other: ProductNumber): boolean {
    return this.value === other.value;
  }

  /**
   * Representación como string
   */
  toString(): string {
    return this.value;
  }
}
