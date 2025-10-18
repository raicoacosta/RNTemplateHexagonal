import {IHttp} from '@core/Infrastructure/Contracts/Http.interface';
import {CreditCard} from '../../Domain/Entities/CreditCard';
import {ICreditCardRepository} from '../../Domain/Ports/ICreditCardRepository';
import {dtoToAllCreditCards} from '../../Domain/Mappers/DtoToCreditCard';
import {AllCreditCardsDtoSchema} from '../../Domain/Dtos/CreditCard.dto';
import {validate} from '@helpers/ZodValidator';
import {
  CreditCardNotFoundError,
  CreditCardRepositoryError,
} from '../../Domain/Exceptions/CreditCardErrors';

/**
 * Implementación HTTP del repositorio de tarjetas de crédito
 * Adaptador de infraestructura que implementa el port ICreditCardRepository
 */
export class HttpCreditCardRepository implements ICreditCardRepository {
  constructor(private readonly http: IHttp) {}

  async getAll(): Promise<CreditCard[]> {
    try {
      const response = await this.http.get(
        'https://run.mocky.io/v3/66f931fe-02c6-450d-820f-dc3fd64c3662',
      );

      // Validar con Zod schema
      validate(AllCreditCardsDtoSchema, response);

      // Mapear DTO a Entidades
      return dtoToAllCreditCards(response);
    } catch (error) {
      throw new CreditCardRepositoryError('Failed to fetch credit cards', error);
    }
  }

  async getById(productNumber: string): Promise<CreditCard> {
    try {
      const allCards = await this.getAll();
      const card = allCards.find(c => c.productNumber === productNumber);

      if (!card) {
        throw new CreditCardNotFoundError(productNumber);
      }

      return card;
    } catch (error) {
      if (error instanceof CreditCardNotFoundError) {
        throw error;
      }
      throw new CreditCardRepositoryError(
        `Failed to fetch credit card ${productNumber}`,
        error,
      );
    }
  }

  async save(creditCard: CreditCard): Promise<void> {
    try {
      await this.http.post('/api/credit-cards', creditCard);
    } catch (error) {
      throw new CreditCardRepositoryError('Failed to save credit card', error);
    }
  }

  async delete(productNumber: string): Promise<void> {
    try {
      await this.http.delete(`/api/credit-cards/${productNumber}`);
    } catch (error) {
      throw new CreditCardRepositoryError(
        `Failed to delete credit card ${productNumber}`,
        error,
      );
    }
  }
}
