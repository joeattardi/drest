class RestError extends Error {
  constructor(message: string, public readonly body: any) {
    super(message);
  }
}

function buildUrl(urlTemplate: string, defaults: any = {}, options: any) {
  let url = urlTemplate;

  Object.keys(options).forEach(option => {
    url = url.replace(`{${option}}`, options[option]);
  });

  Object.keys(defaults).forEach(option => {
    url = url.replace(`{${option}}`, defaults[option]);
  });

  return url;
}

function buildBody(urlTemplate: string, defaults: any = {}, options: any) {
  const allOptions = {
    ...defaults,
    ...options
  };

  const bodyKeys = Object.keys(allOptions).filter(option => !urlTemplate.includes(`{${option}}`));

  const result: any = {};
  bodyKeys.forEach(bodyKey => result[bodyKey] = allOptions[bodyKey]);
  return result;
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