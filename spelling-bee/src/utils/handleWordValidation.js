export const handleWordValidation = (
  word,
  setShowMessage,
  data,
  foundWords,
  setFoundWords,
  dispatchGuess
) => {
  const lowerCaseWord = word.content.toLowerCase();

  if (lowerCaseWord.length == 0) {
    setShowMessage("empty");
  } else if (!lowerCaseWord.includes(data.centerLetter)) {
    setShowMessage("missing-central-letter");
  } else if (data.answers.includes(lowerCaseWord)) {
    // increase score if the answer is correct and not already found
    if (!foundWords.includes(lowerCaseWord)) {
      setFoundWords([...foundWords, lowerCaseWord]);
      dispatchGuess({
        type: "increaseScore",
        score: lowerCaseWord.length === 4 ? 1 : lowerCaseWord.length,
      });
      setShowMessage("showScore");
    } else if (foundWords.includes(lowerCaseWord)) {
      // SHOWING ERROR MESSAGE HERE If the word is already found
      setShowMessage(true);
    }
  } else {
    // running this block if the word does not exist
    setShowMessage("NON");
  }
};
