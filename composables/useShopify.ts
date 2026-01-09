/**
 * Shopify Storefront API Integration
 *
 * Provides a reusable composable for querying the Shopify Storefront API.
 * Uses GraphQL to fetch product data, variants, images, and pricing.
 *
 * @example
 * const { fetchShopify } = useShopify()
 * const data = await fetchShopify(query, { handle: 'product-handle' })
 */
export const useShopify = () => {
  const config = useRuntimeConfig()

  /**
   * Execute a GraphQL query against Shopify Storefront API
   * @param query - GraphQL query string
   * @param variables - Query variables (optional)
   * @returns Promise resolving to API response data
   * @throws Error if API request fails
   */
  const fetchShopify = async (query: string, variables = {}) => {
    const { data, error } = await useFetch(
      `https://${config.public.shopifyDomain}/api/2023-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': config.public.shopifyToken
        },
        body: {
          query,
          variables
        }
      }
    )

    if (error.value) throw error.value
    return data.value
  }

  return { fetchShopify }
}