# Portfolio Project

Angular 19 standalone project with dark theme, Clean Architecture, and Facade pattern.

## Commands
- `npm start` - Dev server at http://localhost:4200
- `npm run build` - Production build to `dist/portfolio`

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
- Bootstrap 5 available for grid utilities only