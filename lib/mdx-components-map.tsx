import { Callout } from '@/components/ui/Callout'
import { MetricCard, MetricCardGroup } from '@/components/ui/MetricCard'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { Accordion, AccordionGroup } from '@/components/ui/Accordion'
import { FeatureCard, FeatureGrid } from '@/components/ui/FeatureCard'
import { TeamGrid, TeamProfile } from '@/components/ui/TeamProfile'
import { Testimonial } from '@/components/ui/Testimonial'
import { Countdown } from '@/components/ui/Countdown'

export const sharedMdxComponents = {
  // Custom React Components
  Callout,
  MetricCard,
  MetricCardGroup,
  Tabs,
  Tab,
  Accordion,
  AccordionGroup,
  FeatureCard,
  FeatureGrid,
  TeamProfile,
  TeamGrid,
  Testimonial,
  Countdown,

  // HTML Element Overrides (Fixing Blogger Migration Styles)
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300" {...props} />,
  a: (props: any) => <a className="text-orange-600 dark:text-orange-400 hover:underline font-medium transition-colors" {...props} />,
  
  // Custom Table Overrides
  table: (props: any) => (
    <div className="w-full overflow-x-auto my-8 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm hide-scrollbar">
      <table className="w-full text-left text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800" {...props} />,
  th: (props: any) => <th className="px-4 py-3 font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap" {...props} />,
  td: (props: any) => <td className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800/50 text-neutral-700 dark:text-neutral-300" {...props} />,
  tr: (props: any) => <tr className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors" {...props} />,

  // Custom Image Override with Captions
  img: (props: any) => (
    <span className="flex flex-col items-center justify-center my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm max-w-full h-auto object-cover"
        loading="lazy"
      />
      {props.alt && (
        <span className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-3 text-center block max-w-2xl italic">
          {props.alt}
        </span>
      )}
    </span>
  ),
};