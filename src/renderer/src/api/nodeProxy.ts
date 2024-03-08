const testServer = '43.138.27.56:8082';
const productionServer = '43.138.27.56:8082';
const localServer = 'localhost';

export function fetchEnv(env: string | boolean | undefined) {
  switch (env) {
    case 'local':
      return { targetUrl: localServer };
    case 'test':
      return { targetUrl: testServer };
    case 'production':
      return { targetUrl: productionServer };
    default:
      return { targetUrl: '' };
  }
}
