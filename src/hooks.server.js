export async function handle({ event, resolve }) {
    const USERNAME = 'admin';
    const PASSWORD = 'password';
    const ENCODED_CREDENTIALS = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
  
    if (event.url.pathname.startsWith('/manage') || event.url.pathname.startsWith('/ban')) {
      const authHeader = event.request.headers.get('authorization');
  
      if (authHeader) {
        const [scheme, encoded] = authHeader.split(' ');
  
        if (scheme === 'Basic' && encoded === ENCODED_CREDENTIALS) {
          return await resolve(event);
        }
      }
  
      return new Response('Authentication Required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' }
      });
    }
  
    return await resolve(event);
  }
  