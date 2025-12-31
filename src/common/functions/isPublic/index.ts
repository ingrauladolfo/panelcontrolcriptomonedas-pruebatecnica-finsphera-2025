/**
 * The function `isPublic` checks if a given path is in a list of public paths and does not start with
 * '/dashboard'.
 * @param {string} path - The `path` parameter is a string that represents the URL path of a web page.
 * @returns The function `isPublic` returns a boolean value indicating whether the given `path` is a
 * public path.
 */
export const isPublic = (path: string) => {
    const publicPaths = ['/login', '/inicio-sesion'];
    return publicPaths.includes(path) && !path.startsWith('/dashboard');
};