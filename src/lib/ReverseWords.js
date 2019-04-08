export async function handler(event, context) {
  return {
    statusCode: 200,
    body: `Hello world Fibonacci ${Math.floor(Math.random() * 10)}`
  };
}
