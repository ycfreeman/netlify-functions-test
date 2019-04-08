import _ from "lodash";

export async function handler(event, context) {
  try {
    const { path } = event;
    const p = `${path.replace("/api/", "")}`;

    console.log(p);

    const handlers = {
      fibonacci: require("./lib/Fibonacci").handler,
      reversewords: require("./lib/ReverseWords").handler,
      token: require("./lib/Token").handler,
      triangletype: require("./lib/TriangleType").handler
    };
    const handler = handlers[_.toLower(p)];
    console.log(handler);
    if (handler) {
      return handler(event, context);
    }

    throw new Error(`method not allowed: ${JSON.stringify(event, null, 1)}`);
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }
}
