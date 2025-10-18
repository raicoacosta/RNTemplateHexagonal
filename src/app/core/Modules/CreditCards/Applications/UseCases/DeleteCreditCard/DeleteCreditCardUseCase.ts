import {ICreditCardRepository} from '../../../Domain/Ports/ICreditCardRepository';
import {ILogger} from '@core/Infrastructure/Contracts/Logger.interface';
import {Result} from '@app/shared/Types/Result';
import {
  CreditCardNotFoundError,
  CreditCardRepositoryError,
} from '../../../Domain/Exceptions/CreditCardErrors';

/**
 * Use Case: Eliminar una tarjeta de crédito
 */
export class DeleteCreditCardUseCase {
  constructor(
    private readonly repository: ICreditCardRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param productNumber Número de producto de la tarjeta a eliminar
   * @returns Result con void o error
   */
  async execute(
    productNumber: string,
  ): Promise<Result<void, CreditCardNotFoundError | CreditCardRepositoryError>> {
    try {
      this.logger.info('Deleting credit card', {productNumber});

      await this.repository.delete(productNumber);

      this.logger.info('Credit card deleted successfully', {productNumber});

      return Result.ok(undefined);
    } catch (error) {
      this.logger.error('Failed to delete credit card', error, {productNumber});

      if (error instanceof CreditCardNotFoundError) {
        return Result.fail(error);
      }

      if (error instanceof CreditCardRepositoryError) {
        return Result.fail(error);
      }

      return Result.fail(
        new CreditCardRepositoryError('Unexpected error deleting credit card', error),
      );
    }
  }
}
