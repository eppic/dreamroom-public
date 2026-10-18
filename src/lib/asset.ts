// Prefixes public asset paths with the basePath (needed for GitHub Pages)
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
