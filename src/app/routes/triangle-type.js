import _ from "lodash";
import { isInt } from "../utils";

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
    // must form a triangle
    return getSideClassification(a, b, c);
  }
  return "Error";
};

export default function TriangleTypeGet(req, res) {
  const {
    query: { a, b, c }
  } = req;
  if (_.some([a, b, c], _.isEmpty)) {
    res.status(404).end();
    return;
  }

  const s = [a, b, c].map(v => parseFloat(v, 10));
  if (!_.every(s, v => _.isNumber(v) && isInt(v))) {
    // doesn't support fraction
    res.status(400).json({
      message: "The request is invalid."
    });
    return;
  }

  if (!_.every(s, v => v < 999999999)) {
    // mimic limit
    res.status(400).json({
      message: "The request is invalid."
    });
    return;
  }

  res.json(f(s[0], s[1], s[2]));
}
