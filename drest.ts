import { buildBody, buildUrl } from './utils.ts';

class RestError extends Error {
  constructor(message: string, public readonly body: any) {
    super(message);
  }
}

export function createClient(definitions: any): any {
  const client: any = {};

  Object.keys(definitions).forEach(name => {
    const definition = definitions[name];

    client[name] = async function(options: any = {}) : Promise<any> {
      const url = buildUrl(definition.url, definition.defaults, options);
      const body = buildBody(definition.url, definition.defaults, options);

      const response = await fetch(url, {
        method: definition.method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...definition.headers
        }
      });

      if (response.status >= 400 && response.status <= 599) {
        throw new RestError(response.statusText, await response.json());
      }

      return response.json();
    };
  });

  return client;
}