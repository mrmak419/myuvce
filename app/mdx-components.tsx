import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/ui/Callout'
import { MetricCard, MetricCardGroup } from '@/components/ui/MetricCard'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { Accordion, AccordionGroup } from '@/components/ui/Accordion'

const mdxComponents = {
  Callout,
  MetricCard,
  MetricCardGroup,
  Tabs,
  Tab,
  Accordion,
  AccordionGroup,
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-slate-700" {...props} />,
};