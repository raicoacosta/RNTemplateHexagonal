import {ProductNumber} from '../../src/app/core/Modules/CreditCards/Domain/ValueObjects/ProductNumber';
import {InvalidProductNumberError} from '../../src/app/core/Modules/CreditCards/Domain/Exceptions/CreditCardErrors';

describe('ProductNumber Value Object', () => {
  describe('create', () => {
    it('should create a valid ProductNumber with 16 digits', () => {
      const validNumber = '4076733111412174';
      const productNumber = ProductNumber.create(validNumber);

      expect(productNumber.getValue()).toBe(validNumber);
    });

    it('should throw error for invalid length', () => {
      const invalidNumber = '123456';

      expect(() => ProductNumber.create(invalidNumber)).toThrow(
        InvalidProductNumberError,
      );
    });

    it('should throw error for non-numeric characters', () => {
      const invalidNumber = '407673311141217A';

      expect(() => ProductNumber.create(invalidNumber)).toThrow(
        InvalidProductNumberError,
      );
    });

    it('should throw error for empty string', () => {
      expect(() => ProductNumber.create('')).toThrow(InvalidProductNumberError);
    });
  });

  describe('getMasked', () => {
    it('should return masked number with last 4 digits', () => {
      const productNumber = ProductNumber.create('4076733111412174');

      expect(productNumber.getMasked()).toBe('****-****-****-2174');
    });
  });

  describe('getLastFourDigits', () => {
    it('should return last 4 digits', () => {
      const productNumber = ProductNumber.create('4076733111412174');

      expect(productNumber.getLastFourDigits()).toBe('2174');
    });
  });

  describe('equals', () => {
    it('should return true for same product numbers', () => {
      const number1 = ProductNumber.create('4076733111412174');
      const number2 = ProductNumber.create('4076733111412174');

      expect(number1.equals(number2)).toBe(true);
    });

    it('should return false for different product numbers', () => {
      const number1 = ProductNumber.create('4076733111412174');
      const number2 = ProductNumber.create('5555444433332222');

      expect(number1.equals(number2)).toBe(false);
    });
  });
});
