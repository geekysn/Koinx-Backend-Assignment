import { z } from 'zod';

export const statsSchema = z.object({
    coin: z.enum(['bitcoin', 'ethereum', 'matic-network']),
    currency: z.enum(['usd', 'inr']).default('inr')
})

export const deviationSchema = z.object({
    coin: z.enum(['bitcoin', 'ethereum', 'matic-network']),
    currency: z.enum(['usd', 'inr']).default('inr')
})

export type StatsQuery = z.infer<typeof statsSchema>
export type DeviationQuery = z.infer<typeof deviationSchema>