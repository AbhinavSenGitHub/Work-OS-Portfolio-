/**
 * The site lives under this path (abhinavsen.com/workos). Next.js adds it to
 * <Link>s and assets by itself; plain URLs built by hand must add it (see
 * `site.url` and `withBase`).
 */
export const basePath = "/workos";

export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
