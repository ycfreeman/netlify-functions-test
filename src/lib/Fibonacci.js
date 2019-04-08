import _ from "lodash";

function fibonacci(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return (memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo));
}

const f = n => {
  const num = parseInt(n, 10);
  if (num === 0) {
    return 0;
  }
  return fibonacci(num - 1);
};

export async function handler(event, context) {
  const {
    queryStringParameters: { n }
  } = event;
  if (_.some([n], _.isEmpty)) {
    throw new Error(`missing params: ${JSON.stringify(event, null, 1)}`);
  }
  if (!_.isNumber(parseInt(n, 10))) {
    throw new Error(`incorrect param type: ${JSON.stringify(event, null, 1)}`);
  }

  return {
    statusCode: 200,
    body: `${f(n)}`
  };
}
