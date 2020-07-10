import { createClient } from '../drest.ts';

const client = createClient({
  getUsers: {
    method: 'GET',
    url: 'https://reqres.in/api/users?page={page}',
    defaults: {
      page: 1
    }
  },

  getUser: {
    method: 'GET',
    url: 'https://reqres.in/api/users/{id}'
  },

  login: {
    method: 'POST',
    url: 'https://reqres.in/api/login'
  },

  test: {
    method: 'GET',
    url: 'https://httpbin.org/headers',
    headers: {
      'Acess-Token': 'abc123'
    }
  }
});

// console.log(await client.getUsers());
// console.log(await client.getUser(23));

// try {
//   console.log(await client.login({
//     email: 'eve.holt@reqres.in',
//     password: 'mypassword'
//   }));
// } catch (err) {
//   console.log(err.body);
// }

// console.log(await client.test());