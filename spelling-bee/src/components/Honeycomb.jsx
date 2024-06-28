import { useEffect, useState } from 'react';
import { Letter } from './Letter';
import {
    DataContext,
    GuessContext,
    WordContext,
    FoundWordsContext,
    MessagesContext, StepsContext,
} from '../contexts/Contexts';
import { useContext } from 'react';
import { handleWordValidation } from '../utils/handleWordValidation';

export function Honeycomb() {
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

    const [randomArr, setRandomArr] = useState([0, 1, 2, 3, 4, 5]);

    const shuffle = () => {
        setRandomArr([...randomArr].sort(() => Math.random() - 0.5));
    };

    const deleteLetter = () => {
        dispatchWord({
            type: 'removeLetter',
        });
    };

    const enter = () => {
        handleWordValidation(
            word,
            setShowMessage,
            data,
            foundWords,
            setFoundWords,
            dispatchGuess
        )
    };

    return (
        <>
            <article className="honeycomb">
                <Letter letter={data.centerLetter} isCenter={true} />
                <Letter letter={data.outerLetters[randomArr[0]]} isCenter={false} />
                <Letter letter={data.outerLetters[randomArr[1]]} isCenter={false} />
                <Letter letter={data.outerLetters[randomArr[2]]} isCenter={false} />
                <Letter letter={data.outerLetters[randomArr[3]]} isCenter={false} />
                <Letter letter={data.outerLetters[randomArr[4]]} isCenter={false} />
                <Letter letter={data.outerLetters[randomArr[5]]} isCenter={false} />
            </article>
            <section className="buttons">
                <button className="button" onClick={deleteLetter}>
                    Delete
                </button>
                <button className="button" onClick={shuffle}>
                    Shuffle
                </button>
                <button className="button" onClick={enter}>
                    Enter
                </button>
            </section>
        </>
    );
}
