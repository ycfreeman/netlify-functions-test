// walk through each character
// if not a space, add to array
// if it's a space stop, then
// reverse all characters in array
// add reversed word to result
// if it's a space, just add to result

function reverseWord(w) {
  return [...w].reverse().join("");
}

const f = v => {
  let buffer = v;
  let word = "";
  let sentence = "";
  while (buffer) {
    const c = buffer.substr(0, 1);
    buffer = buffer.substr(1);
    if (!c.match(/[\s\n]/)) {
      // test for any space or linebreaks
      word += c;
    } else {
      sentence += reverseWord(word) + c;
      word = "";
    }
  }
  return sentence + reverseWord(word);
};

export default function ReverseWordsGet(req, res) {
  const {
    query: { sentence = "" }
  } = req;
  if (sentence.length > 2030) {
    res.status(404).json();
    return;
  }

  res.json(f(sentence));
}
