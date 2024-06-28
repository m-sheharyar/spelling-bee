const handleEnter = (event) => {
  if (event.key === "Enter") {
    const lowerCaseWord = word.content.toLowerCase();

    if (lowerCaseWord.length == 0) {
      setShowMessage("empty");
      setTimeout(() => {
        setShowMessage(false);
        dispatchWord({
          type: "clearContent",
        });
      }, 1000);
      return;
    }

    if (!lowerCaseWord.includes(data.centerLetter)) {
      setShowMessage("missing-central-letter");
      setTimeout(() => {
        setShowMessage(false);
        dispatchWord({
          type: "clearContent",
        });
      }, 1000);
      return;
    }

    if (data.answers.includes(lowerCaseWord)) {
      // increase score if the answer is correct and not already found
      if (!foundWords.includes(lowerCaseWord)) {
        setFoundWords([...foundWords, lowerCaseWord]);
        dispatchGuess({
          type: "increaseScore",
          score: lowerCaseWord.length === 4 ? 1 : lowerCaseWord.length,
        });
        setShowMessage("showScore");
        setTimeout(() => {
          setShowMessage(false);
          dispatchWord({ type: "clearContent" });
        }, 1000);
      }

      if (foundWords.includes(lowerCaseWord)) {
        // SHOWING ERROR MESSAGE HERE If the word is already found
        setShowMessage(true);
        // hiding error message after 1 second and clearing the input field
        setTimeout(() => {
          setShowMessage(false);
          dispatchWord({
            type: "clearContent",
          });
        }, 1000);
      }
    } else {
      // running this block if the word does not exist
      setShowMessage("NON");
      setTimeout(() => {
        setShowMessage(false);
        dispatchWord({
          type: "clearContent",
        });
      }, 1000);
    }
  }
};

//

const enter = () => {
  const lowerCaseWord = word.content.toLowerCase();
  if (data.answers.includes(lowerCaseWord)) {
    if (!foundWords.includes(lowerCaseWord)) {
      setFoundWords([...foundWords, lowerCaseWord]);
      dispatchGuess({
        type: "increaseScore",
        score: lowerCaseWord.length === 4 ? 1 : lowerCaseWord.length,
      });
      setShowMessage("showScore");
      setTimeout(() => {
        setShowMessage(false);
        dispatchWord({ type: "clearContent" });
      }, 1000);
    }

    if (foundWords.includes(lowerCaseWord)) {
      // SHOWING ERROR MESSAGE HERE If the word is already found
      setShowMessage(true);
      // hiding error message after 1 second and clearing the input field
      setTimeout(() => {
        setShowMessage(false);
        dispatchWord({
          type: "clearContent",
        });
      }, 1000);
    }
  } else {
    // running this block if the word does not exist
    setShowMessage("NON");
    setTimeout(() => {
      setShowMessage(false);
      dispatchWord({
        type: "clearContent",
      });
    }, 1000);
  }
};
