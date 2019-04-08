import _ from "lodash";
import { createResponse } from "../formatter";

function getSideClassification(a, b, c) {
  //  if all sides are equal
  if (a === b && b === c) return "Equilateral";
  //  if any two sides are equal
  else if (a === b || b === c) return "Isosceles";
  else return "Scalene";
}

const f = (a, b, c) => {
  const arr = [a, b, c].sort((a, b) => a - b); // sort from small to large
  const [a1, b1, c1] = arr;
  if (a1 + b1 > c1) {
    return getSideClassification(a, b, c);
  }
  return "Error";
};

export async function handler(event, context) {
  const {
    queryStringParameters: { a, b, c }
  } = event;
  if (_.some([a, b, c], _.isEmpty)) {
    throw new Error(`missing params: ${JSON.stringify(event, null, 1)}`);
  }
  if (!_.every([a, b, c], v => _.isNumber(parseInt(v, 10)))) {
    throw new Error(`incorrect param type: ${JSON.stringify(event, null, 1)}`);
  }

  return createResponse(
    {
      body: f(parseInt(a, 10), parseInt(b, 10), parseInt(c, 10))
    },
    event.headers
  );
}
