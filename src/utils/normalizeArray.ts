import type z from 'zod';

export function adapterFunction<TInput, TOutput>(
  rawData: TInput,
  schema: z.ZodType<TInput>,
  normalizeFn: (item: TInput) => TOutput,
): TOutput | TOutput[] | Record<string, TOutput> {
  try {
    if (Array.isArray(rawData)) {
      return rawData.map((item) => normalizeFn(schema.parse(item)));
    }

    if (typeof rawData === 'object' && rawData !== null) {
      // objeto completo → parsear y normalizar directamente
      const parsed = schema.parse(rawData);
      return normalizeFn(parsed);
    }

    // fallback: lo tratamos como array de un solo item
    return [normalizeFn(schema.parse(rawData))];
  } catch (error) {
    console.log(error, 'error');
  }
  return [];
}
