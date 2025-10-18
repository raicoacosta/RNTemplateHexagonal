import {CreditCard} from '../Entities/CreditCard';

/**
 * Port (Interface) para el repositorio de tarjetas de crédito
 * Define el contrato que deben cumplir los adaptadores de infraestructura
 * Principio de Inversión de Dependencias (DIP) - SOLID
 */
export interface ICreditCardRepository {
  /**
   * Obtiene todas las tarjetas de crédito
   * @returns Promise con array de tarjetas de crédito
   */
  getAll(): Promise<CreditCard[]>;

  /**
   * Obtiene una tarjeta de crédito por su número de producto
   * @param productNumber Número de producto de la tarjeta
   * @returns Promise con la tarjeta de crédito
   */
  getById(productNumber: string): Promise<CreditCard>;

  /**
   * Guarda o actualiza una tarjeta de crédito
   * @param creditCard Entidad de tarjeta de crédito
   * @returns Promise void
   */
  save(creditCard: CreditCard): Promise<void>;

  /**
   * Elimina una tarjeta de crédito
   * @param productNumber Número de producto de la tarjeta
   * @returns Promise void
   */
  delete(productNumber: string): Promise<void>;
}
