import { Heading, Text } from "@chakra-ui/react"

import { FeatureFlagClient } from "./client-component"
import { getClient } from "./lib"

// @see https://docs.launchdarkly.com/home/observability/contexts
const context = {
  kind: "app-page",
  key: "feature-flags",
}

export const dynamic = "force-dynamic" // 'auto' | 'force-dynamic' | 'error' | 'force-static'
// export const revalidate = 10 // false, Infinity, number

export default async function FeatureFlags() {
  const client = await getClient()
  const variation = await client.variation("sample-feature", context, false)

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Feature flags: LaunchDarkly
        </Heading>
        <Text>
          Experimentación A/B y feature flags con LaunchDarkly. Nuestra
          aplicación leerá el estado de feature flags en tiempo real y
          dependiendo de su valor renderizará una cosa u otra.
        </Text>
      </header>
      
      {/* Usar el componente del lado del cliente con el valor inicial del servidor */}
      <FeatureFlagClient initialValue={variation} />
    </main>
  )
}
