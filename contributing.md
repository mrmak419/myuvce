# Contributing to MyUVCE

First off, thank you for considering contributing to MyUVCE. This platform is built by students, for students. 

To keep the codebase scalable, maintainable, and highly performant, we treat this repository like a professional, production-grade engineering environment. Please read these guidelines before submitting a Pull Request.

## The Engineering Mindset

1. **Production-Ready Code Only:** Do not submit "hacky" workarounds. If a feature requires a hack, discuss it in an Issue first. Write clean, readable, and strongly-typed (TypeScript) code.
2. **Mobile-First:** A massive portion of our traffic comes from mobile devices on poor cellular networks. Every UI component must be fully responsive and tested on mobile viewports.
3. **Performance is a Feature:** Do not introduce heavy client-side libraries unless absolutely necessary. Respect the Next.js App Router paradigm (Server Components by default, Client Components only when interactivity is required).

## UI & Design Rules

* **Icons:** Use **Lucide React** (`lucide-react`) for all iconography across the platform to maintain a clean, modern, and consistent aesthetic.
* **Dark Mode:** Every component you build must natively support Dark Mode. Use Tailwind's `dark:` modifier and test it thoroughly. Do not hardcode raw hex colors; use Tailwind's neutral, orange, and brand palettes.
* **Typography:** Utilize the standard Geist font variables configured in the root layout.

## Development Workflow

1. **Find an Issue:** Look for open issues or open a new one to discuss a feature/bug before you start writing code.
2. **Fork & Branch:** * Fork the repository.
   * Create a descriptively named branch: `git checkout -b feature/campus-map-update` or `bugfix/nav-mobile-scroll`.
3. **Write Code:** Follow the architecture guidelines above.
4. **Test Locally:** * Run `npm run dev` to ensure no console errors.
   * Run `npm run build` to verify the production build doesn't fail due to TypeScript or ESLint errors.
5. **Commit:** Write clear, concise commit messages. (e.g., `feat: added sgpa calculator widget to utilities hub`).
6. **Open a Pull Request:** Target the `main` branch. Provide a clear description of what you changed, why you changed it, and include screenshots if it is a UI change.

## Content Contributions (MDX)

If you are just looking to write a guide, add a new set of PYQs, or post an update, you don't need to touch the React code.
1. Navigate to the `/content` directory.
2. Create a new `.mdx` file following the existing frontmatter formatting (Title, Date, Description).
3. Submit a PR.

---

*By contributing to this repository, you agree that your contributions will be licensed under the project's open-source license.*
