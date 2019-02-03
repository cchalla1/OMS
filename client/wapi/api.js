const PARAM = /{}/g;
const TOKEN_TYPE = 'Bearer';
const GET = 'GET';
const HEAD = 'HEAD';

const capitalize = s => s[0].toUpperCase() + s.slice(1);

const getHeaders = (config, args) => {
  const headers = {
    'Accept': config.responseType || 'application/json',
    'Content-Type': config.requestType || 'application/json'
  };

  const token = window.localStorage.getItem('BearerToken') || null;

  // If the user has an access token then send it.
  if (token != null) {
    headers.Authorization = `${capitalize(TOKEN_TYPE)} ${token}`;
  }

  const endpointHeaders = args.headers;

  return {...headers, ...endpointHeaders};
};

const getUrl = (config, args) => {
  const {params = [], query = {}} = args;

  let matchCount = 0;

  const replacer = match => {
    return params.length > matchCount ? encodeURI(params[matchCount++]) : match;
  };

  // Append path params
  const urlWithPathParams = config.url.replace(PARAM, replacer);

  // Create query string from the query params
  const urlQueryParams = new URLSearchParams();
  for (const [key, val] of Object.entries(query)) {
    urlQueryParams.append(key, val);
  }
  const queryString = urlQueryParams.toString();

  // if the query string is empty, return the existing url
  if (!queryString) {
    return urlWithPathParams;
  }

  // Check if there's an existing query string prior to appending
  const urlObj = new URL(urlWithPathParams, 'http://example.com');
  if (urlObj.queryString) {
    return urlWithPathParams + '&' + queryString;
  }

  // Existing URL does not contain query string so append query string to the url with the path params
  return urlWithPathParams + '?' + queryString;
};

const getOptions = (config, args, state) => {
  return {
    cache: 'no-cache',
    credentials: 'include',
    headers: getHeaders(config, args, state),
    method: config.method
  };
};

export const makeApiCall = () => {

  return {
    getRequest (payload, config = {}, state = {}) {
      const processedInput = payload === {} ? null : JSON.stringify(payload);
      const url = getUrl(config, processedInput);
      const options = getOptions(config, processedInput, state);
      Object.assign(options, {method: config.method});
      if (config.method !== GET && config.method !== HEAD) {
        Object.assign(options, {body: processedInput});
      }

      return new Request(url, options);
    }
  };
};
