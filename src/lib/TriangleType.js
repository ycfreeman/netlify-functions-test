import _ from "lodash";

const f = (a, b, c) => {
  return `success ${a} ${b} ${c}`;
};

export async function handler(event, context) {
  const {
    queryStringParameters: { a, b, c }
  } = event;
  if (_.some([a, b, c], _.isEmpty)) {
    throw new Error(`missing params: ${JSON.stringify(event, null, 1)}`);
  }

  return {
    statusCode: 200,
    body: f(a, b, c)
  };
}
