import type { MDXComponents } from 'mdx/types'
import { sharedMdxComponents } from '@/lib/mdx-components-map'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...sharedMdxComponents,
  }
}