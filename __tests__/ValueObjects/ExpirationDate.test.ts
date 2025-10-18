import {ExpirationDate} from '../../src/app/core/Modules/CreditCards/Domain/ValueObjects/ExpirationDate';

describe('ExpirationDate Value Object', () => {
  describe('fromString', () => {
    it('should create a valid expiration date', () => {
      const expDate = ExpirationDate.fromString('12/2025');
      
      expect(expDate).toBeDefined();
      expect(expDate.format()).toBe('12/2025');
    });

    it('should throw error for invalid format', () => {
      expect(() => ExpirationDate.fromString('13/2025')).toThrow(
        'Invalid month'
      );
    });

    it('should throw error for invalid month (00)', () => {
      expect(() => ExpirationDate.fromString('00/2025')).toThrow('Invalid month');
    });

    it('should throw error for invalid month (13)', () => {
      expect(() => ExpirationDate.fromString('13/2025')).toThrow('Invalid month');
    });

    it('should throw error for wrong format', () => {
      expect(() => ExpirationDate.fromString('2025-12')).toThrow();
    });

    it('should throw error for invalid characters', () => {
      expect(() => ExpirationDate.fromString('AA/2025')).toThrow();
    });

    it('should accept dates with leading zero', () => {
      const expDate = ExpirationDate.fromString('01/2025');
      expect(expDate.format()).toBe('01/2025');
    });
  });

  describe('isExpired', () => {
    it('should return true for past dates', () => {
      const expDate = ExpirationDate.fromString('01/2020');
      expect(expDate.isExpired()).toBe(true);
    });

    it('should return false for future dates', () => {
      const now = new Date();
      const futureYear = now.getFullYear() + 2;
      const expDate = ExpirationDate.fromString(`12/${futureYear}`);
      expect(expDate.isExpired()).toBe(false);
    });

    it('should return false for current month', () => {
      const now = new Date();
      const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
      const currentYear = now.getFullYear();
      const expDate = ExpirationDate.fromString(`${currentMonth}/${currentYear}`);
      expect(expDate.isExpired()).toBe(false);
    });

    it('should return true for last month of previous year', () => {
      const lastYear = new Date().getFullYear() - 1;
      const expDate = ExpirationDate.fromString(`12/${lastYear}`);
      expect(expDate.isExpired()).toBe(true);
    });
  });

  describe('willExpireInMonths', () => {
    it('should return true if expires within specified months', () => {
      const now = new Date();
      const nextMonth = now.getMonth() + 2; // +1 for current month, +1 for next
      const year = now.getFullYear() + Math.floor(nextMonth / 12);
      const month = String((nextMonth % 12) + 1).padStart(2, '0');
      
      const expDate = ExpirationDate.fromString(`${month}/${year}`);
      expect(expDate.willExpireInMonths(3)).toBe(true);
    });

    it('should return false if expires beyond specified months', () => {
      const now = new Date();
      const futureYear = now.getFullYear() + 2;
      const expDate = ExpirationDate.fromString(`12/${futureYear}`);
      expect(expDate.willExpireInMonths(3)).toBe(false);
    });

    it('should return true for already expired dates', () => {
      const expDate = ExpirationDate.fromString('01/2020');
      expect(expDate.willExpireInMonths(3)).toBe(true);
    });
  });

  describe('format', () => {
    it('should return MM/YYYY format', () => {
      const expDate = ExpirationDate.fromString('06/2025');
      expect(expDate.format()).toBe('06/2025');
    });

    it('should maintain leading zeros', () => {
      const expDate = ExpirationDate.fromString('01/2025');
      expect(expDate.format()).toBe('01/2025');
    });
  });

  describe('formatShort', () => {
    it('should return MM/YY format', () => {
      const expDate = ExpirationDate.fromString('06/2025');
      expect(expDate.formatShort()).toBe('06/25');
    });

    it('should handle year 2030', () => {
      const expDate = ExpirationDate.fromString('12/2030');
      expect(expDate.formatShort()).toBe('12/30');
    });

    it('should maintain leading zeros in short format', () => {
      const expDate = ExpirationDate.fromString('01/2025');
      expect(expDate.formatShort()).toBe('01/25');
    });
  });

  describe('equals', () => {
    it('should return true for same dates', () => {
      const expDate1 = ExpirationDate.fromString('12/2025');
      const expDate2 = ExpirationDate.fromString('12/2025');
      
      expect(expDate1.equals(expDate2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const expDate1 = ExpirationDate.fromString('12/2025');
      const expDate2 = ExpirationDate.fromString('11/2025');
      
      expect(expDate1.equals(expDate2)).toBe(false);
    });

    it('should return false for different years', () => {
      const expDate1 = ExpirationDate.fromString('12/2025');
      const expDate2 = ExpirationDate.fromString('12/2026');
      
      expect(expDate1.equals(expDate2)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle December correctly', () => {
      const expDate = ExpirationDate.fromString('12/2025');
      expect(expDate.format()).toBe('12/2025');
    });

    it('should handle January correctly', () => {
      const expDate = ExpirationDate.fromString('01/2025');
      expect(expDate.format()).toBe('01/2025');
    });

    it('should handle year 2099', () => {
      const expDate = ExpirationDate.fromString('12/2099');
      expect(expDate.format()).toBe('12/2099');
    });
  });
});
