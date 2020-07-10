import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { buildBody, buildUrl } from "./utils.ts";

Deno.test("buildUrl", () => {
  let expected = "https://example.com/joe/123";
  let actual = buildUrl("https://example.com/{name}/{id}", {}, {
    name: "joe",
    id: "123",
  });
  assertEquals(actual, expected);

  actual = buildUrl("https://example.com/{name}/{id}", { name: "joe" }, {
    id: "123",
  });
  assertEquals(actual, expected);
});

Deno.test("buildBody", () => {
  let expected = { username: "joe", password: "mypassword" };
  let actual = buildBody("https://example.com/login", {}, {
    username: "joe",
    password: "mypassword",
  });
  assertEquals(actual, expected);

  actual = buildBody("https://example.com/login/{id}", {}, {
    id: "123",
    username: "joe",
    password: "mypassword",
  });
  assertEquals(actual, expected);

  actual = buildBody("https://example.com/login", {
    username: "joe",
    password: "mypassword",
  }, {});
  assertEquals(actual, expected);
});
