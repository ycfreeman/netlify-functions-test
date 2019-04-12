const axios = require("axios");

describe("/", () => {
  const api = axios.create({
    // baseURL: "https://knockknock.readify.net/api",
    baseURL: "http://localhost/.netlify/functions/api",
  });

  const url = "/";

  it("request", async () => {
    try {
      await api.request({
        url
      });
    } catch (e) {
      // expect(e.response.data).toMatchSnapshot();
      expect(e).toMatchSnapshot();
    }
  });
});
