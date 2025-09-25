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
      const parsed = schema.parse(rawData);
      return normalizeFn(parsed);
    }

    return [normalizeFn(schema.parse(rawData))];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}
