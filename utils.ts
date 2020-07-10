export function buildUrl(urlTemplate: string, defaults: any = {}, options: any) {
  let url = urlTemplate;

  Object.keys(options).forEach(option => {
    url = url.replace(`{${option}}`, options[option]);
  });

  Object.keys(defaults).forEach(option => {
    url = url.replace(`{${option}}`, defaults[option]);
  });

  return url;
}

export function buildBody(urlTemplate: string, defaults: any = {}, options: any) {
  const allOptions = {
    ...defaults,
    ...options
  };

  const bodyKeys = Object.keys(allOptions).filter(option => !urlTemplate.includes(`{${option}}`));

  const result: any = {};
  bodyKeys.forEach(bodyKey => result[bodyKey] = allOptions[bodyKey]);
  return result;
}
