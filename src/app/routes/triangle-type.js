import _ from "lodash";

function getSideClassification(a, b, c) {
  //  if all sides are equal
  if (a === b && b === c) return "Equilateral";
  //  if any two sides are equal
  if (a === b || b === c) return "Isosceles";
  return "Scalene";
}

const f = (a, b, c) => {
  const arr = [a, b, c].sort((aa, bb) => aa - bb); // sort from small to large
  const [a1, b1, c1] = arr;
  if (a1 + b1 > c1) {
    return getSideClassification(a, b, c);
  }
  return "Error";
};

export default function TriangleTypeGet(req, res, next) {
  const {
    query: { a, b, c }
  } = req;
  if (_.some([a, b, c], _.isEmpty)) {
    next(new Error(`missing params: ${JSON.stringify(req, null, 1)}`));
  }
  if (!_.every([a, b, c], v => _.isNumber(parseInt(v, 10)))) {
    next(new Error(`incorrect param type: ${JSON.stringify(req, null, 1)}`));
  }

  res.send(
    JSON.stringify(f(parseInt(a, 10), parseInt(b, 10), parseInt(c, 10)))
  );
}
