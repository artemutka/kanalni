/**
 * Cloudflare Pages Middleware
 * This runs on every request before hitting the static assets or other functions.
 */

export async function onRequest(context) {
    const request = context.request;
    const url = new URL(request.url);

    // If someone tries to access the raw Cloudflare Pages URL (*.pages.dev),
    // permanently redirect (301) them to our exact path on the canonical custom domain.
    if (url.hostname.endsWith('.pages.dev')) {
        url.hostname = 'kanalni.if.ua';
        return Response.redirect(url.toString(), 301);
    }

    // Otherwise, proceed to render the page or static asset normally
    return context.next();
}
