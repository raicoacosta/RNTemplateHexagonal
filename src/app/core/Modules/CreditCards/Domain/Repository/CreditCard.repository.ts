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
  } catch {
    throw new Error('SCHEMA_VALIDATION_ERROR');
  }
};

// Mock data para desarrollo
const MOCK_CREDIT_CARDS = [
  {
    alias: 'Tarjeta de credito platinum',
    bankName: 'BCP',
    cashAdvance: 3000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '12/2026',
    isInternational: false,
    name: 'Platinum Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '4076733111412174',
    productType: 'TC',
  },
  {
    alias: 'Tarjeta de credito oro',
    bankName: 'BCP',
    cashAdvance: 7000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '06/2027',
    isInternational: false,
    name: 'Gold Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '222767232311412174',
    productType: 'TC',
  },
  {
    alias: 'Tarjeta de credito black',
    bankName: 'BCP',
    cashAdvance: 15000,
    currency: 'PEN',
    currencyUS: 'USD',
    currentBalanceRD: 0,
    expirationDateCC: '03/2028',
    isInternational: true,
    name: 'Black Card',
    pendingBalanceAtCutRD: 0,
    productNumber: '5555444433332222',
    productType: 'TC',
  },
];

export class CreditCardRepository
  implements IGetAll<CreditCard[]>, IPost<CreditCard, void>
{
  private http = new HttpImplementation();

  public async getAll(): Promise<CreditCard[]> {
    // Simulando una llamada asíncrona con delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Usar data mock en lugar de API externa
    const creditCard = MOCK_CREDIT_CARDS;

    // Validar con Zod schema
    validate(AllCreditCardsDtoSchema, creditCard);

    // Mapear DTO a Entidades
    return dtoToAllCreditCards(creditCard);
  }

  public async post(body: any): Promise<void> {
    // Simulando operación POST
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Mock POST:', body);
  }
}
