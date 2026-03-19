'use client'

import { useEffect, Suspense } from 'react'
import posthog from './posthog'
import { usePathname, useSearchParams } from 'next/navigation'

function PostHogInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, searchParams])

  return null
}

export default function PostHogProvider({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <PostHogInner />
      </Suspense>
      {children}
    </>
  )
}