import _ from "lodash";

// walk through each character
// if not a space, add to array
// if it's a space stop
// reverse all characters in array
// add reversed word to result
// if it's a space, just add to result

const f = a => {
  return a
    .split(" ") // split space
    .map(w => [...w].reverse().join("")) // reverse word
    .join(" "); // join string
};

export default function ReverseWordsGet(req, res, next) {
  const {
    query: { sentence }
  } = req;
  if (_.some([sentence], _.isEmpty)) {
    next(new Error(`missing params: ${JSON.stringify(req, null, 1)}`));
  }
  if (!_.isString(sentence)) {
    next(new Error(`incorrect param type: ${JSON.stringify(req, null, 1)}`));
  }

  res.send(JSON.stringify(f(sentence)));
}
