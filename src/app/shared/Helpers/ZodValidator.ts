/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';

export const validate = (
  schema: z.ZodObject<any> | z.ZodArray<any>,
  dto: any,
): {
  [x: string]: any;
} => {
  try {
    return schema.parse(dto);
  } catch (e) {
    throw new Error('SCHEMA_VALIDATION_ERROR');
  }
};
