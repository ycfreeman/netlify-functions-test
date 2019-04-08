export async function handler(event, context) {
  const { path } = event;
  const p = `${path.replace("/api/", "")}`;

  const handlers = {
    Fibonacci: require("./lib/Fibonacci").handler,
    ReverseWords: require("./lib/ReverseWords").handler,
    Token: require("./lib/ReverseWords").handler,
    TriangleType: require("./lib/TriangleType").handler
  };
  const handler = handlers[p];
  if (handler && typeof handler === "function") {
    return handler(event, context);
  }

  return {
    statusCode: 500,
    body: "method not allowed"
  };
}
