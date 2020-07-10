# drest

Drest is a very simple abstraction layer over the fetch API when calling REST APIs. 

## Usage

Drest exports a single function, `createClient`. This is called with API definitions. 

Each definition has a key and a set of properties. The key will be the name of the function on the client object. For example, if you give a key of `getUsers`, then the resulting client object will have a `getUsers` function.

The URL template is required. This is a property called `url`, which is the URL of the endpoint, with placeholders for variables. For example: `https://reqres.in/api/users?page={page}`. The `page` parameter will be added when the client function is executed.

### Client functions

The functions on the returned client object take a single parameter. This is an object that has (1) any parameters to set in the URL, and (2) any parameters to set in the request body (if it is not a `GET` request).

The parameters/options are all given in a single object. The way this works is as follows: Any options whose key is a parameter in the URL template will be used in the URL. Any remaining options will be passed as the body.

### Defaults

When creating the client, a `defaults` property can also be passed. This contains default values to use for the options when they are not specified on the client call.

### Example

```typescript
import { createClient } from 'https://raw.githubusercontent.com/joeattardi/drest/master/mod.ts';

const client = createClient({
  getUsers: {
    method: 'GET',
    url: 'https://reqres.in/api/users?page={page}'
  }
});

const users = await client.getUsers({ page: 1 });
```

## API

### `createClient`

Creates a REST client with one or more functions. Takes an object whose keys are the function names and whose values are the client function definitions. The definitions can have the following properties:

- `method`: The HTTP method to use for the request.
- `url`: A URL template. Parameter names are enclosed in curly braces.
- `defaults`: An object containing default values for the expected options.
