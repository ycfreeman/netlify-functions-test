/* eslint-disable no-await-in-loop */
const axios = require("axios");

describe("triangle-type", () => {
  const api = axios.create({
    // baseURL: "https://knockknock.readify.net/api"
    baseURL: "http://localhost/.netlify/functions/api"
  });

  const url = "/triangletype";

  it("success", async () => {
    const { data } = await api.request({
      url,
      params: { a: 3, b: 4, c: 5 }
    });
    expect(data).toMatchSnapshot();
    // expect(headers).toMatchSnapshot();
  });

  it("text/json", async () => {
    const { data } = await api.request({
      url,
      params: { a: 3, b: 4, c: 5 }
    });
    expect(data).toMatchSnapshot();
    // expect(headers).toMatchSnapshot();
  });

  it("methods", async done => {
    await Promise.all(
      ["get", "head", "post", "put", "delete", "options", "patch"].map(
        async method => {
          try {
            const { data } = await api.request({
              url,
              params: { a: 3, b: 4, c: 5 },
              method
            });
            expect(data).toMatchSnapshot(method);
          } catch (e) {
            expect(e.response.data).toMatchSnapshot(method);
            expect(e).toMatchSnapshot(method);
          }
        }
      )
    );

    done();
  });

  it("missing param", async () => {
    try {
      const { data } = await api.request({
        url
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    try {
      const { data } = await api.request({
        url,
        params: { a: 3, b: 4 }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }

    try {
      const { data } = await api.request({
        url,
        params: { a: 3 }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("string", async () => {
    try {
      const { data } = await api.request({
        url,
        params: { a: "a", b: "b", c: 5 }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("fraction", async () => {
    try {
      const { data } = await api.request({
        url,
        params: { a: 3.3, b: 4.4, c: 5.5 }
      });
      expect(data).toMatchSnapshot();
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("different types", async () => {
    await Promise.all(
      [[3, 4, 5], [3, 3, 3], [4, 4, 5], [1, 2, 4], [0, 0, 0]].map(
        async ([a, b, c]) => {
          try {
            const { data } = await api.request({
              url,
              params: { a, b, c }
            });
            expect(data).toMatchSnapshot(`${a}, ${b}, ${c}`);
          } catch (e) {
            expect(e.response.data).toMatchSnapshot(`${a}, ${b}, ${c}`);
            expect(e).toMatchSnapshot(`${a}, ${b}, ${c}`);
          }
        }
      )
    );
  });

  it("limit?", async done => {
    let error;
    let s = [3, 4, 5];

    do {
      try {
        s = s.map(x => x * 10);
        const [a, b, c] = s;

        const { data } = await api.request({
          url,
          params: {
            a,
            b,
            c
          }
        });
        expect(data).toMatchSnapshot(`${a}, ${b}, ${c}`);
      } catch (e) {
        error = e;
      }
    } while (!error);

    expect(`loop stops at ${s.join(", ")}`).toMatchSnapshot();
    expect(error).toMatchSnapshot();
    expect(error.response.data).toMatchSnapshot();
    expect.hasAssertions();

    done();
  }, 1000000);
});
