import { z } from 'zod';

/**
 * Normaliza un array de datos usando Zod para validar y una función de mapeo para transformar.
 *
 * @param rawArray - Array de objetos crudos
 * @param schema - Esquema Zod que valida el objeto
 * @param normalizeFn - Función que transforma un objeto validado en el output deseado
 */
export function adapterFunction<TInput, TOutput>(
  rawData: unknown,
  schema: z.ZodType<TInput>,
  normalizeFn: (item: TInput) => TOutput,
): TOutput[] {
  // Si rawData no es array, lo convertimos en array
  const arr = Array.isArray(rawData) ? rawData : [rawData];
  try {
    return arr.map((item) => {
      const parsed = schema.parse(item); // valida cada item
      return normalizeFn(parsed); // lo transforma
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
