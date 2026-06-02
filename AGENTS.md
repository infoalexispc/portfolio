# Portfolio Project

Angular 20 standalone project with dark theme, Clean Architecture, and Facade pattern.

## Commands
- `npx ng serve` - Dev server at http://localhost:4200
- `npx ng build` - Production build to `dist/portfolio`
- `npx ng update` - Update Angular and dependencies

## Architecture
- `core/services/` - Singleton services (GithubService)
- `features/` - Lazy-loaded route components
- `features/*/facade/` - Facade pattern with signals for state
- `shared/components/` - Reusable standalone components
- `layout/` - Header/Footer

## Key Patterns
- **Signals**: Use `signal()`, `computed()`, `asReadonly()` for reactive state
- **Facade**: Components consume facades, not services directly
- **Standalone**: All components are standalone by default (no `standalone: true` needed)
- **Mobile-first**: Use `BreakpointObserver` from `@angular/cdk/layout`

## GitHub Integration
- Username: `infoalexispc`
- API: `https://api.github.com/users/{username}/repos`
- Rate limit: 60 requests/hour (unauthenticated)

## Theme
- Dark theme via Angular Material with cyan/orange accent
- CSS custom properties in `styles.scss` for colors
- CSS Grid/Flexbox native (no framework)

## Skills
Installed via `npx autoskills` in `.agents/skills/`:
- Angular: angular-developer, reference-core, reference-signal-forms, reference-compiler-cli, adev-writing-guide, pr_review
- TypeScript: typescript-advanced-types
- Node.js: nodejs-backend-patterns, nodejs-best-practices
- Frontend: frontend-design, accessibility, seo

Install more skills: `npx autoskills -y`

Use the `/skill` command in opencode to load skills.