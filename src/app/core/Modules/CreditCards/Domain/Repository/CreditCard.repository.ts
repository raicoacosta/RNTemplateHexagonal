import HttpImplementation from '@core/Infrastructure/Http/Http.implementation';
import {IGetAll, IPost} from '@core/Infrastructure/Contracts/Methods';
import {CreditCard} from '../Entities/CreditCard';
import {dtoToAllCreditCards} from '../Mappers/DtoToCreditCard';
import {AllCreditCardsDtoSchema} from '../Dtos/CreditCard.dto';
import {z} from 'zod';

export const validate = (
  schema: z.ZodObject<any> | z.ZodArray<any>,
  dto: any,
): {
  [x: string]: any;
} => {
  try {
    return schema.parse(dto);
  } catch (_error) {
    throw new Error('SCHEMA_VALIDATION_ERROR');
  }
};

export class CreditCardRepository
  implements IGetAll<CreditCard[]>, IPost<CreditCard, void>
{
  private http = new HttpImplementation();
  public async getAll(): Promise<CreditCard[]> {
    const creditCard = await this.http.get(
      'https://run.mocky.io/v3/66f931fe-02c6-450d-820f-dc3fd64c3662',
    );
    validate(AllCreditCardsDtoSchema, creditCard);
    return dtoToAllCreditCards(creditCard);
  }

  public async post(body: any): Promise<void> {
    await this.http.get('local', {body});
  }

  // [
  //   {
  //     "alias": "Tarjeta de credito platinum",
  //     "bankName": "BCP",
  //     "cashAdvance": 3000,
  //     "currency": "value",
  //     "currencyUS": "value",
  //     "currentBalanceRD": 0,
  //     "expirationDateCC": "value",
  //     "isInternational": false,
  //     "name": "value",
  //     "pendingBalanceAtCutRD": 0,
  //     "productNumber": "4076733111412174",
  //     "productType": "TC"
  //   },
  //   {
  //     "alias": "Tarjeta de credito oro",
  //     "bankName": "BCP",
  //     "cashAdvance": 7000,
  //     "currency": "value",
  //     "currencyUS": "value",
  //     "currentBalanceRD": 0,
  //     "expirationDateCC": "value",
  //     "isInternational": false,
  //     "name": "value",
  //     "pendingBalanceAtCutRD": 0,
  //     "productNumber": "222767232311412174",
  //     "productType": "TC"
  //   }
  // ]
}
