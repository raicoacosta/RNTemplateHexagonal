import {CreditCardValidationError} from '../Exceptions/CreditCardErrors';

/**
 * Value Object para la fecha de expiración de una tarjeta de crédito
 * Formato: MM/YYYY
 */
export class ExpirationDate {
  private readonly month: number;
  private readonly year: number;

  private constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  /**
   * Factory method para crear desde string con formato MM/YYYY
   * @param value String en formato MM/YYYY (ej: "12/2026")
   * @throws CreditCardValidationError si el formato es inválido
   */
  static fromString(value: string): ExpirationDate {
    if (!value || typeof value !== 'string') {
      throw new CreditCardValidationError('Expiration date is required');
    }

    const parts = value.split('/');
    if (parts.length !== 2) {
      throw new CreditCardValidationError(`Invalid expiration date format: ${value}. Expected MM/YYYY`);
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    if (isNaN(month) || isNaN(year)) {
      throw new CreditCardValidationError(`Invalid expiration date: ${value}`);
    }

    if (month < 1 || month > 12) {
      throw new CreditCardValidationError(`Invalid month: ${month}. Must be between 1 and 12`);
    }

    if (year < 1000 || year > 9999) {
      throw new CreditCardValidationError(`Invalid year: ${year}. Must be 4 digits`);
    }

    return new ExpirationDate(month, year);
  }

  /**
   * Factory method para crear desde componentes separados
   */
  static fromComponents(month: number, year: number): ExpirationDate {
    return ExpirationDate.fromString(`${month.toString().padStart(2, '0')}/${year}`);
  }

  /**
   * Verifica si la tarjeta está expirada
   */
  isExpired(): boolean {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() es 0-indexed

    if (this.year < currentYear) {
      return true;
    }

    if (this.year === currentYear && this.month < currentMonth) {
      return true;
    }

    return false;
  }

  /**
   * Verifica si expirará en los próximos N meses
   */
  willExpireInMonths(months: number): boolean {
    const now = new Date();
    const futureDate = new Date(now.getFullYear(), now.getMonth() + months, 1);
    const expirationDate = new Date(this.year, this.month - 1, 1);

    return expirationDate <= futureDate;
  }

  /**
   * Obtiene el mes
   */
  getMonth(): number {
    return this.month;
  }

  /**
   * Obtiene el año
   */
  getYear(): number {
    return this.year;
  }

  /**
   * Formatea como MM/YYYY
   */
  format(): string {
    return `${this.month.toString().padStart(2, '0')}/${this.year}`;
  }

  /**
   * Formatea como MM/YY (solo últimos 2 dígitos del año)
   */
  formatShort(): string {
    const shortYear = this.year.toString().slice(-2);
    return `${this.month.toString().padStart(2, '0')}/${shortYear}`;
  }

  /**
   * Verifica igualdad con otra fecha
   */
  equals(other: ExpirationDate): boolean {
    return this.month === other.month && this.year === other.year;
  }

  /**
   * Representación como string
   */
  toString(): string {
    return this.format();
  }
}
