import { z } from 'zod';

export const ItunesFeedSchema = z.object({
  id: z.object({
    attributes: z.object({
      'im:id': z.string(),
    }),
    label: z.string().url(),
  }),
  'im:artist': z.object({
    label: z.string(),
  }),
  'im:image': z.array(
    z.object({
      label: z.string().url(),
      attributes: z
        .object({
          height: z.string(),
        })
        .optional(),
    }),
  ),
  'im:name': z.object({
    label: z.string(),
  }),
  summary: z.object({
    label: z.string(),
  }),
  title: z.object({
    label: z.string(),
  }),
  link: z
    .object({
      attributes: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  'im:releaseDate': z.object({
    label: z.string(),
  }),
  rights: z
    .object({
      label: z.string(),
    })
    .optional(),
});

export type ItunesFeedRaw = z.infer<typeof ItunesFeedSchema>;
