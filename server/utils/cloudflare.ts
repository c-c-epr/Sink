import type { H3Event } from 'h3'

function hasValidAnalyticsCredentials(cfAccountId: string, cfApiToken: string) {
  return /^[a-f0-9]{32}$/i.test(cfAccountId) && cfApiToken.length > 20
}

export function useWAE(event: H3Event, query: string) {
  const { cfAccountId, cfApiToken } = useRuntimeConfig(event)
  console.info('useWAE', query)

  if (!hasValidAnalyticsCredentials(cfAccountId, cfApiToken)) {
    console.warn('useWAE skipped because Cloudflare Analytics credentials are not configured')
    return Promise.resolve({ data: [] })
  }

  return $fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfApiToken}`,
    },
    body: query,
    retry: 1,
    retryDelay: 100, // ms
  })
}
