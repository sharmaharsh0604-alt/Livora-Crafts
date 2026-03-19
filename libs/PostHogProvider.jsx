'use client'

import { useEffect } from 'react'
import posthog from './posthog'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PostHogProvider({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [pathname, searchParams])

  return children
}