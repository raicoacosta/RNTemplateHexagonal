import {CreditCard} from '../../../Domain/Entities/CreditCard';
import {ICreditCardRepository} from '../../../Domain/Ports/ICreditCardRepository';
import {ILogger} from '@core/Infrastructure/Contracts/Logger.interface';
import {Result} from '@app/shared/Types/Result';
import {CreditCardRepositoryError} from '../../../Domain/Exceptions/CreditCardErrors';

/**
 * Request DTO para crear una tarjeta de crédito
 */
export interface CreateCreditCardRequest {
  alias: string;
  bankName: string;
  cashAdvance: number;
  currency: string;
  currencyUS: string;
  currentBalanceRD: number;
  expirationDateCC: string;
  isInternational: boolean;
  name: string;
  pendingBalanceAtCutRD: number;
  productNumber: string;
  productType: string;
}

/**
 * Use Case: Crear/Guardar una tarjeta de crédito
 */
export class CreateCreditCardUseCase {
  constructor(
    private readonly repository: ICreditCardRepository,
    private readonly logger: ILogger,
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param request Datos de la tarjeta a crear
   * @returns Result con void o error
   */
  async execute(
    request: CreateCreditCardRequest,
  ): Promise<Result<void, CreditCardRepositoryError>> {
    try {
      this.logger.info('Creating credit card', {
        productNumber: request.productNumber,
        alias: request.alias,
      });

      // Crear entidad
      const creditCard = new CreditCard(
        request.alias,
        request.bankName,
        request.cashAdvance,
        request.currency,
        request.currencyUS,
        request.currentBalanceRD,
        request.expirationDateCC,
        request.isInternational,
        request.name,
        request.pendingBalanceAtCutRD,
        request.productNumber,
        request.productType,
      );

      // Persistir
      await this.repository.save(creditCard);

      this.logger.info('Credit card created successfully', {
        productNumber: request.productNumber,
      });

      return Result.ok(undefined);
    } catch (error) {
      this.logger.error('Failed to create credit card', error, {
        productNumber: request.productNumber,
      });

      if (error instanceof CreditCardRepositoryError) {
        return Result.fail(error);
      }

      return Result.fail(
        new CreditCardRepositoryError('Unexpected error creating credit card', error),
      );
    }
  }
}
