const axios = require("axios");
const _ = require("lodash");

describe("fibonacci", () => {
  const api = axios.create({
    // baseURL: "https://knockknock.readify.net/api"
    baseURL: "http://localhost/.netlify/functions/api"
  });

  const url = "/fibonacci";

  it("success", async () => {
    const { data } = await api.request({
      url,
      params: { n: 20 }
    });
    expect(data).toMatchSnapshot();
    // expect(headers).toMatchSnapshot();
  });

  it("text/json", async () => {
    const { data } = await api.request({
      url,
      params: { n: 20 }
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
              params: { n: 20 },
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
      await api.request({
        url
      });
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("invalid string", async () => {
    try {
      await api.request({
        url,
        params: { n: "xxx" }
      });
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("invalid fraction", async () => {
    try {
      await api.request({
        url,
        params: { n: 1.1 }
      });
    } catch (e) {
      expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });

  it("valid", async done => {
    await Promise.all(
      _.range(0, 100, 1).map(async n => {
        try {
          const { data } = await api.request({
            url,
            params: { n }
          });
          expect(data).toMatchSnapshot(`${n}`);
        } catch (e) {
          expect(e.response.data).toMatchSnapshot(`${n}`);
          expect(e).toMatchSnapshot(`${n}`);
        }
      })
    );

    done();
  }, 10000000);
});
