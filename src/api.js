import _ from "lodash";
import { createResponse } from "./formatter";

export async function handler(event, context) {
  try {
    const { path, httpMethod, headers } = event;
    if (httpMethod !== "GET") {
      return createResponse(
        {
          statusCode: 405,
          body: `The requested resource does not support http method '${httpMethod}'`
        },
        headers
      );
    }
    const p = _.last(path.split("/")); // just grab last part of path
    const handlers = {
      fibonacci: require("./lib/Fibonacci").handler,
      reversewords: require("./lib/ReverseWords").handler,
      token: require("./lib/Token").handler,
      triangletype: require("./lib/TriangleType").handler
    };
    const handler = handlers[_.toLower(p)];
    if (handler) {
      return handler(event, context);
    }

    throw new Error(`method not allowed: ${JSON.stringify(event, null, 1)}`);
  } catch (e) {
    return createResponse(
      {
        statusCode: 400,
        // body: e.message,
        body: "The request is invalid."
      },
      headers
    );
  }
}
