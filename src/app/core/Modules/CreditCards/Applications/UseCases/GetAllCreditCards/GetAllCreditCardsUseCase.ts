import {CreditCard} from '../../../Domain/Entities/CreditCard';
import {ICreditCardRepository} from '../../../Domain/Ports/ICreditCardRepository';
import {ILogger} from '@core/Infrastructure/Contracts/Logger.interface';
import {Result} from '@app/shared/Types/Result';
import {CreditCardRepositoryError} from '../../../Domain/Exceptions/CreditCardErrors';

/**
 * Use Case: Obtener todas las tarjetas de crédito
 * Principio de Responsabilidad Única (SRP)
 */
export class GetAllCreditCardsUseCase {
  constructor(
    private readonly repository: ICreditCardRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @returns Result con array de tarjetas o error
   */
  async execute(): Promise<Result<CreditCard[], CreditCardRepositoryError>> {
    try {
      this.logger.info('Fetching all credit cards');

      const cards = await this.repository.getAll();

      this.logger.info('Credit cards fetched successfully', {
        count: cards.length,
      });

      return Result.ok(cards);
    } catch (error) {
      this.logger.error('Failed to fetch credit cards', error);

      if (error instanceof CreditCardRepositoryError) {
        return Result.fail(error);
      }

      return Result.fail(
        new CreditCardRepositoryError('Unexpected error fetching credit cards', error),
      );
    }
  }
}
