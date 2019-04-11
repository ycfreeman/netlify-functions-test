/* eslint-disable no-return-assign,no-param-reassign */
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

export default function FibonacciGet(req, res, next) {
  const {
    query: { n }
  } = req;
  if (_.some([n], _.isEmpty)) {
    next(new Error(`missing params: ${JSON.stringify(req, null, 1)}`));
  }
  if (!_.isNumber(parseInt(n, 10))) {
    next(new Error(`incorrect param type: ${JSON.stringify(req, null, 1)}`));
  }

  res.json(f(n));
}
