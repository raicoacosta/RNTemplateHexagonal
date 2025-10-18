import {Money, Currency} from '../../src/app/core/Modules/CreditCards/Domain/ValueObjects/Money';
import {
  InvalidMoneyAmountError,
  CurrencyMismatchError,
} from '../../src/app/core/Modules/CreditCards/Domain/Exceptions/CreditCardErrors';

describe('Money Value Object', () => {
  describe('create', () => {
    it('should create money with valid amount', () => {
      const money = Money.create(100, Currency.USD);

      expect(money.getAmount()).toBe(100);
      expect(money.getCurrency()).toBe(Currency.USD);
    });

    it('should create money with zero amount', () => {
      const money = Money.create(0, Currency.PEN);

      expect(money.getAmount()).toBe(0);
      expect(money.isZero()).toBe(true);
    });

    it('should throw error for negative amount', () => {
      expect(() => Money.create(-100, Currency.USD)).toThrow(
        InvalidMoneyAmountError,
      );
    });
  });

  describe('add', () => {
    it('should add two amounts with same currency', () => {
      const money1 = Money.create(100, Currency.USD);
      const money2 = Money.create(50, Currency.USD);

      const result = money1.add(money2);

      expect(result.getAmount()).toBe(150);
      expect(result.getCurrency()).toBe(Currency.USD);
    });

    it('should throw error when adding different currencies', () => {
      const money1 = Money.create(100, Currency.USD);
      const money2 = Money.create(50, Currency.PEN);

      expect(() => money1.add(money2)).toThrow(CurrencyMismatchError);
    });
  });

  describe('subtract', () => {
    it('should subtract two amounts with same currency', () => {
      const money1 = Money.create(100, Currency.USD);
      const money2 = Money.create(30, Currency.USD);

      const result = money1.subtract(money2);

      expect(result.getAmount()).toBe(70);
    });

    it('should throw error when result is negative', () => {
      const money1 = Money.create(50, Currency.USD);
      const money2 = Money.create(100, Currency.USD);

      expect(() => money1.subtract(money2)).toThrow(InvalidMoneyAmountError);
    });
  });

  describe('multiply', () => {
    it('should multiply by positive factor', () => {
      const money = Money.create(100, Currency.USD);

      const result = money.multiply(2);

      expect(result.getAmount()).toBe(200);
    });

    it('should throw error when multiplying by negative', () => {
      const money = Money.create(100, Currency.USD);

      expect(() => money.multiply(-2)).toThrow(InvalidMoneyAmountError);
    });
  });

  describe('comparison methods', () => {
    it('should correctly compare greater than', () => {
      const money1 = Money.create(100, Currency.USD);
      const money2 = Money.create(50, Currency.USD);

      expect(money1.isGreaterThan(money2)).toBe(true);
      expect(money2.isGreaterThan(money1)).toBe(false);
    });

    it('should correctly compare less than', () => {
      const money1 = Money.create(50, Currency.USD);
      const money2 = Money.create(100, Currency.USD);

      expect(money1.isLessThan(money2)).toBe(true);
      expect(money2.isLessThan(money1)).toBe(false);
    });

    it('should correctly check equality', () => {
      const money1 = Money.create(100, Currency.USD);
      const money2 = Money.create(100, Currency.USD);
      const money3 = Money.create(100, Currency.PEN);

      expect(money1.equals(money2)).toBe(true);
      expect(money1.equals(money3)).toBe(false);
    });
  });

  describe('format', () => {
    it('should format money with currency', () => {
      const money = Money.create(1000.5, Currency.PEN);

      const formatted = money.format();

      expect(formatted).toContain('PEN');
      expect(formatted).toContain('1,000.50');
    });
  });
});
