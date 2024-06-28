import { useContext } from 'react';
import { useEffect } from "react";
import {
  DataContext,
  GuessContext,
  WordContext,
  FoundWordsContext,
  MessagesContext,
  StepsContext
} from '../contexts/Contexts';

import { handleWordValidation } from '../utils/handleWordValidation';

export function Word() {
  const [word, dispatchWord] = useContext(WordContext);
  const data = useContext(DataContext);
  const [guess, dispatchGuess] = useContext(GuessContext);
  const [foundWords, setFoundWords] = useContext(FoundWordsContext);
  const [showMessage, setShowMessage] = useContext(MessagesContext);
  const [step, dispatchStep] = useContext(StepsContext)

  // we are running this to update the level as soon as score changes.
  useEffect(() => {
    // This effect runs after guess.score updates
    dispatchStep({
      type: "updateLevel",
      payload: { score: guess.score }
    });
  }, [guess.score, dispatchStep]);

  // making sure it run only once and iff when showMessage changes
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false)
        dispatchWord({
          type: "clearContent",
        });
      }, 1000);
    }

  }, [showMessage])

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleWordValidation(
        word,
        setShowMessage,
        data,
        foundWords,
        setFoundWords,
        dispatchGuess
      )
    }
  };


  return (
    <>
      <input
        autoFocus
        value={word.content.toUpperCase()}
        onChange={event =>
          dispatchWord({
            type: 'typeLetter',
            content: event.target.value,
          })
        }
        onKeyDown={handleEnter}
        placeholder="Type or click"
        className="custom-cursor"
      />
    </>
  );
}
