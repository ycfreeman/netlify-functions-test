import _ from "lodash";

export function createResponse(response, headers) {
  const { "content-type": contentType = "application/json" } = headers;
  const { statusCode = 200, body } = response;
  return {
    statusCode,
    body: _.isString(body) ? JSON.stringify(body) : `${body}`,
    headers: {
      "content-type": `${contentType}; charset=utf-8`,
      "strict-transport-security":
        "max-age=15552000; includeSubDomains; preload",
      expires: "-1",
      "x-content-type-options": "nosniff",
      "expect-ct":
        'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
      vary: "Accept-Encoding",
      allow: "GET"
    }
  };
}
