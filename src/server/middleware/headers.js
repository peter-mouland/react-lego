import crypto from 'crypto';

export default function headers() {
  return async (ctx, next) => {
    await next();
    if (ctx.body && ctx.response.status === 200) {
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      ctx.set('Pragma', 'no-cache');
      ctx.set('Expires', 0);
      if (typeof ctx.body === 'string') {
        ctx.set('Content-Length', ctx.body.length);
        ctx.set('etag', crypto.createHash('md5').update(ctx.body).digest('hex'));
      }
    }
  };
}
