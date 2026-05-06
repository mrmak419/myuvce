import fs from 'fs';
import path from 'path';

/**
 * Recursively crawls the app directory to find static Next.js pages,
 * ignoring dynamic routes and API folders.
 */
export function getStaticRoutes(dir: string, routePath = ''): string[] {
  let routes: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip dynamic routes (e.g., [slug], [...catchall])
      if (file.startsWith('[') && file.endsWith(']')) continue;
      
      // Skip api folders or private folders (e.g., _components)
      if (file === 'api' || file.startsWith('_')) continue;

      // Handle Next.js Route Groups (e.g., (marketing) -> ignore the folder name in the URL)
      const isRouteGroup = file.startsWith('(') && file.endsWith(')');
      const nextRoutePath = isRouteGroup ? routePath : `${routePath}/${file}`;
      
      routes = routes.concat(getStaticRoutes(filePath, nextRoutePath));
    } else if (file.startsWith('page.')) {
      // If we find a page file, push the accumulated route path
      routes.push(routePath === '' ? '/' : routePath);
    }
  }

  return routes;
}

/**
 * Safely resolves the absolute path to the Next.js app directory.
 */
export function getAppDirectory(): string {
  return fs.existsSync(path.join(process.cwd(), 'src/app')) 
    ? path.join(process.cwd(), 'src/app') 
    : path.join(process.cwd(), 'app');
}