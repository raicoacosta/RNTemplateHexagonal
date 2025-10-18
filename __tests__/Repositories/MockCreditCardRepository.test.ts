import {MockCreditCardRepository} from '../../src/app/core/Modules/CreditCards/Infrastructure/Repositories/MockCreditCardRepository';
import {CreditCard} from '../../src/app/core/Modules/CreditCards/Domain/Entities/CreditCard';
import {CreditCardNotFoundError} from '../../src/app/core/Modules/CreditCards/Domain/Exceptions/CreditCardErrors';

describe('MockCreditCardRepository', () => {
  let repository: MockCreditCardRepository;

  beforeEach(() => {
    repository = new MockCreditCardRepository();
  });

  describe('getAll', () => {
    it('should return all credit cards', async () => {
      const cards = await repository.getAll();

      expect(cards).toBeInstanceOf(Array);
      expect(cards.length).toBeGreaterThan(0);
      expect(cards[0]).toBeInstanceOf(CreditCard);
    });

    it('should return cards with expected properties', async () => {
      const cards = await repository.getAll();
      const firstCard = cards[0];

      expect(firstCard.productNumber).toBeDefined();
      expect(firstCard.alias).toBeDefined();
      expect(firstCard.bankName).toBeDefined();
      expect(firstCard.cashAdvance).toBeGreaterThan(0);
    });
  });

  describe('getById', () => {
    it('should return a credit card by product number', async () => {
      const productNumber = '4076733111412174';

      const card = await repository.getById(productNumber);

      expect(card).toBeInstanceOf(CreditCard);
      expect(card.productNumber).toBe(productNumber);
    });

    it('should throw CreditCardNotFoundError for non-existent card', async () => {
      const invalidProductNumber = '0000000000000000';

      await expect(repository.getById(invalidProductNumber)).rejects.toThrow(
        CreditCardNotFoundError,
      );
    });
  });

  describe('save', () => {
    it('should add a new credit card', async () => {
      const newCard = new CreditCard(
        'Test Card',
        'Test Bank',
        5000,
        'USD',
        'USD',
        0,
        '12/2025',
        false,
        'Test Name',
        0,
        '1234567890123456',
        'TC',
      );

      await repository.save(newCard);

      const savedCard = await repository.getById('1234567890123456');
      expect(savedCard.alias).toBe('Test Card');
    });

    it('should update an existing credit card', async () => {
      const cards = await repository.getAll();
      const existingCard = cards[0];

      const updatedCard = new CreditCard(
        'Updated Alias',
        existingCard.bankName,
        existingCard.cashAdvance,
        existingCard.currency,
        existingCard.currencyUS,
        existingCard.currentBalanceRD,
        existingCard.expirationDateCC,
        existingCard.isInternational,
        existingCard.name,
        existingCard.pendingBalanceAtCutRD,
        existingCard.productNumber,
        existingCard.productType,
      );

      await repository.save(updatedCard);

      const savedCard = await repository.getById(existingCard.productNumber);
      expect(savedCard.alias).toBe('Updated Alias');
    });
  });

  describe('delete', () => {
    it('should delete an existing credit card', async () => {
      const cards = await repository.getAll();
      const cardToDelete = cards[0];

      await repository.delete(cardToDelete.productNumber);

      await expect(repository.getById(cardToDelete.productNumber)).rejects.toThrow(
        CreditCardNotFoundError,
      );
    });

    it('should throw error when deleting non-existent card', async () => {
      const invalidProductNumber = '0000000000000000';

      await expect(repository.delete(invalidProductNumber)).rejects.toThrow(
        CreditCardNotFoundError,
      );
    });
  });

  describe('reset', () => {
    it('should reset repository to initial state', async () => {
      const initialCards = await repository.getAll();
      const initialCount = initialCards.length;

      // Eliminar una tarjeta
      await repository.delete(initialCards[0].productNumber);

      let cards = await repository.getAll();
      expect(cards.length).toBe(initialCount - 1);

      // Resetear
      repository.reset();

      cards = await repository.getAll();
      expect(cards.length).toBe(initialCount);
    });
  });
});
