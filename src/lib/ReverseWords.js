import { createResponse } from "../formatter";

const f = a => {
  return a
    .split(" ") // split space
    .map(w => [...w].reverse().join("")) // reverse word
    .join(" "); // join string
};

export async function handler(event, context) {
  const {
    queryStringParameters: { sentence }
  } = event;
  if (_.some([sentence], _.isEmpty)) {
    throw new Error(`missing params: ${JSON.stringify(event, null, 1)}`);
  }
  if (!_.isString(sentence)) {
    throw new Error(`incorrect param type: ${JSON.stringify(event, null, 1)}`);
  }

  return createResponse(
    {
      body: f(sentence)
    },
    event.headers
  );
}
