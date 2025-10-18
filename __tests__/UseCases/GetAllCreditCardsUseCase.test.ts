import {GetAllCreditCardsUseCase} from '../../src/app/core/Modules/CreditCards/Applications/UseCases/GetAllCreditCards/GetAllCreditCardsUseCase';
import {ICreditCardRepository} from '../../src/app/core/Modules/CreditCards/Domain/Ports/ICreditCardRepository';
import {ILogger} from '../../src/app/core/Infrastructure/Contracts/Logger.interface';
import {CreditCard} from '../../src/app/core/Modules/CreditCards/Domain/Entities/CreditCard';
import {CreditCardRepositoryError} from '../../src/app/core/Modules/CreditCards/Domain/Exceptions/CreditCardErrors';

describe('GetAllCreditCardsUseCase', () => {
  let mockRepository: jest.Mocked<ICreditCardRepository>;
  let mockLogger: jest.Mocked<ILogger>;
  let useCase: GetAllCreditCardsUseCase;

  const mockCards: CreditCard[] = [
    new CreditCard(
      'My Platinum',
      'BancoPopular',
      5000,
      'RD$',
      'USD',
      2000,
      '12/2025',
      true,
      'Platinum Card',
      2000,
      '1234567890123456',
      'Credit Card'
    ),
    new CreditCard(
      'My Gold',
      'BancoPopular',
      2500,
      'RD$',
      'USD',
      1000,
      '11/2026',
      false,
      'Gold Card',
      1000,
      '9876543210987654',
      'Credit Card'
    ),
  ];

  beforeEach(() => {
    // Mock repository
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<ICreditCardRepository>;

    // Mock logger
    mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      setContext: jest.fn(),
    } as jest.Mocked<ILogger>;

    useCase = new GetAllCreditCardsUseCase(mockRepository, mockLogger);
  });

  describe('execute - success cases', () => {
    it('should return all credit cards successfully', async () => {
      mockRepository.getAll.mockResolvedValue(mockCards);

      const result = await useCase.execute();

      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toEqual(mockCards);
      expect(result.getValue()).toHaveLength(2);
    });

    it('should call repository getAll method', async () => {
      mockRepository.getAll.mockResolvedValue(mockCards);

      await useCase.execute();

      expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    });

    it('should log info before fetching', async () => {
      mockRepository.getAll.mockResolvedValue(mockCards);

      await useCase.execute();

      expect(mockLogger.info).toHaveBeenCalledWith('Fetching all credit cards');
    });

    it('should log info after successful fetch with count', async () => {
      mockRepository.getAll.mockResolvedValue(mockCards);

      await useCase.execute();

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Credit cards fetched successfully',
        {count: 2}
      );
    });

    it('should return empty array when no cards exist', async () => {
      mockRepository.getAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isSuccess).toBe(true);
      expect(result.getValue()).toEqual([]);
      expect(result.getValue()).toHaveLength(0);
    });

    it('should log zero count for empty results', async () => {
      mockRepository.getAll.mockResolvedValue([]);

      await useCase.execute();

      expect(mockLogger.info).toHaveBeenCalledWith(
        'Credit cards fetched successfully',
        {count: 0}
      );
    });
  });

  describe('execute - error cases', () => {
    it('should return failure result when repository throws error', async () => {
      const error = new Error('Database connection failed');
      mockRepository.getAll.mockRejectedValue(error);

      const result = await useCase.execute();

      expect(result.isFailure).toBe(true);
      expect(result.getError()).toBeInstanceOf(CreditCardRepositoryError);
    });

    it('should log error when fetch fails', async () => {
      const error = new Error('Database error');
      mockRepository.getAll.mockRejectedValue(error);

      await useCase.execute();

      expect(mockLogger.error).toHaveBeenCalledWith(
        'Failed to fetch credit cards',
        error
      );
    });

    it('should wrap error in CreditCardRepositoryError', async () => {
      const originalError = new Error('Network timeout');
      mockRepository.getAll.mockRejectedValue(originalError);

      const result = await useCase.execute();

      expect(result.isFailure).toBe(true);
      const error = result.getError();
      expect(error).toBeInstanceOf(CreditCardRepositoryError);
      expect(error.message).toContain('Unexpected error');
    });

    it('should handle repository returning null', async () => {
      mockRepository.getAll.mockResolvedValue(null as any);

      const result = await useCase.execute();

      // Should throw error or handle null, depending on implementation
      expect(result.isFailure).toBe(true);
    });
  });

  describe('logging behavior', () => {
    it('should call logger methods in correct order', async () => {
      mockRepository.getAll.mockResolvedValue(mockCards);
      const logCalls: string[] = [];

      mockLogger.info.mockImplementation((message: string) => {
        logCalls.push(message);
      });

      await useCase.execute();

      expect(logCalls[0]).toBe('Fetching all credit cards');
      expect(logCalls[1]).toBe('Credit cards fetched successfully');
    });

    it('should not log success when error occurs', async () => {
      mockRepository.getAll.mockRejectedValue(new Error('Test error'));

      await useCase.execute();

      expect(mockLogger.info).toHaveBeenCalledTimes(1); // Only initial log
      expect(mockLogger.error).toHaveBeenCalledTimes(1);
    });
  });
});
