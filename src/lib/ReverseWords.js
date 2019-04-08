import _ from "lodash";

const f = a => {
  return `success ${a}`;
};

export async function handler(event, context) {
  const {
    queryStringParameters: { sentence }
  } = event;
  if (_.some([sentence], _.isEmpty)) {
    throw new Error(`missing params: ${JSON.stringify(event, null, 1)}`);
  }

  return {
    statusCode: 200,
    body: f(sentence)
  };
}
