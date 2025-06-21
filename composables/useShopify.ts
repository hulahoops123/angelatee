export const useShopify = () => {
  const config = useRuntimeConfig()

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