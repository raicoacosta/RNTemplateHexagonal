import {z} from 'zod';

/**
 * Schema Zod para validación de tarjetas de crédito
 * Campos requeridos para garantizar integridad de datos
 */
const CreditCardResponseSchema = z.object({
  alias: z.string().min(1, 'Alias is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  cashAdvance: z.number().nonnegative('Cash advance must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  currencyUS: z.string().min(1, 'Currency US is required'),
  currentBalanceRD: z.number().nonnegative('Current balance must be non-negative'),
  expirationDateCC: z
    .string()
    .regex(/^\d{2}\/\d{4}$/, 'Expiration date must be in MM/YYYY format'),
  isInternational: z.boolean(),
  name: z.string().min(1, 'Name is required'),
  pendingBalanceAtCutRD: z.number().nonnegative('Pending balance must be non-negative'),
  productNumber: z
    .string()
    .regex(/^\d{16}$/, 'Product number must be 16 digits'),
  productType: z.string().min(1, 'Product type is required'),
});

export type CreditCardDto = z.infer<typeof CreditCardResponseSchema>;
export const AllCreditCardsDtoSchema = z.array(CreditCardResponseSchema);
export type AllCreditCardsDto = z.infer<typeof AllCreditCardsDtoSchema>;
