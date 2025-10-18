import {CreditCard} from '../../Domain/Entities/CreditCard';
import {ICreditCardRepository} from '../../Domain/Ports/ICreditCardRepository';
import {CreditCardNotFoundError} from '../../Domain/Exceptions/CreditCardErrors';

/**
 * Mock data para desarrollo y testing
 */
const MOCK_CREDIT_CARDS_DATA = [
  {
    alias: 'Tarjeta de credito platinum',
    bankName: 'BCP',
    cashAdvance: 3000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '12/2026',
    isInternational: false,
    name: 'Platinum Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '4076733111412174',
    productType: 'TC',
  },
  {
    alias: 'Tarjeta de credito oro',
    bankName: 'BCP',
    cashAdvance: 7000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '06/2027',
    isInternational: false,
    name: 'Gold Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '222767232311412174',
    productType: 'TC',
  },
  {
    alias: 'Tarjeta de credito black',
    bankName: 'BCP',
    cashAdvance: 15000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '03/2028',
    isInternational: true,
    name: 'Black Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '5555444433332222',
    productType: 'TC',
  },
];

/**
 * Implementación Mock del repositorio de tarjetas de crédito
 * Útil para desarrollo, pruebas y trabajo offline
 */
export class MockCreditCardRepository implements ICreditCardRepository {
  private creditCards: CreditCard[];

  constructor() {
    // Inicializar con datos mock convertidos a entidades
    this.creditCards = MOCK_CREDIT_CARDS_DATA.map(
      data =>
        new CreditCard(
          data.alias,
          data.bankName,
          data.cashAdvance,
          data.currency,
          data.currencyUS,
          data.currentBalanceRD,
          data.expirationDateCC,
          data.isInternational,
          data.name,
          data.pendingBalanceAtCutRD,
          data.productNumber,
          data.productType,
        ),
    );
  }

  async getAll(): Promise<CreditCard[]> {
    // Simular delay de red
    await this.simulateNetworkDelay();
    return [...this.creditCards];
  }

  async getById(productNumber: string): Promise<CreditCard> {
    await this.simulateNetworkDelay();

    const card = this.creditCards.find(c => c.productNumber === productNumber);

    if (!card) {
      throw new CreditCardNotFoundError(productNumber);
    }

    return card;
  }

  async save(creditCard: CreditCard): Promise<void> {
    await this.simulateNetworkDelay();

    const index = this.creditCards.findIndex(
      c => c.productNumber === creditCard.productNumber,
    );

    if (index >= 0) {
      // Actualizar existente
      this.creditCards[index] = creditCard;
    } else {
      // Agregar nueva
      this.creditCards.push(creditCard);
    }

    console.log('[MockRepository] Card saved:', creditCard.productNumber);
  }

  async delete(productNumber: string): Promise<void> {
    await this.simulateNetworkDelay();

    const index = this.creditCards.findIndex(
      c => c.productNumber === productNumber,
    );

    if (index === -1) {
      throw new CreditCardNotFoundError(productNumber);
    }

    this.creditCards.splice(index, 1);
    console.log('[MockRepository] Card deleted:', productNumber);
  }

  /**
   * Simula un delay de red entre 300-800ms
   */
  private simulateNetworkDelay(): Promise<void> {
    const delay = Math.random() * 500 + 300; // 300-800ms
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Método auxiliar para resetear los datos al estado inicial
   * Útil para testing
   */
  reset(): void {
    this.creditCards = MOCK_CREDIT_CARDS_DATA.map(
      data =>
        new CreditCard(
          data.alias,
          data.bankName,
          data.cashAdvance,
          data.currency,
          data.currencyUS,
          data.currentBalanceRD,
          data.expirationDateCC,
          data.isInternational,
          data.name,
          data.pendingBalanceAtCutRD,
          data.productNumber,
          data.productType,
        ),
    );
  }
}
