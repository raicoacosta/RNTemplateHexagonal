import {CreditCard} from '../../../Domain/Entities/CreditCard';
import {ICreditCardRepository} from '../../../Domain/Ports/ICreditCardRepository';
import {ILogger} from '@core/Infrastructure/Contracts/Logger.interface';
import {Result} from '@app/shared/Types/Result';
import {
  CreditCardNotFoundError,
  CreditCardRepositoryError,
} from '../../../Domain/Exceptions/CreditCardErrors';

/**
 * Use Case: Obtener una tarjeta de crédito por su número de producto
 */
export class GetCreditCardByIdUseCase {
  constructor(
    private readonly repository: ICreditCardRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param productNumber Número de producto de la tarjeta
   * @returns Result con la tarjeta o error
   */
  async execute(
    productNumber: string,
  ): Promise<Result<CreditCard, CreditCardNotFoundError | CreditCardRepositoryError>> {
    try {
      this.logger.info('Fetching credit card by ID', {productNumber});

      const card = await this.repository.getById(productNumber);

      this.logger.info('Credit card found', {
        productNumber,
        alias: card.alias,
      });

      return Result.ok(card);
    } catch (error) {
      this.logger.error('Failed to fetch credit card', error, {productNumber});

      if (error instanceof CreditCardNotFoundError) {
        return Result.fail(error);
      }

      if (error instanceof CreditCardRepositoryError) {
        return Result.fail(error);
      }

      return Result.fail(
        new CreditCardRepositoryError('Unexpected error fetching credit card', error),
      );
    }
  }
}
