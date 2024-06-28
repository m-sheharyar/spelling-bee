import { useEffect, useState, useReducer } from 'react';
// Reducers
import { wordReducer } from './reducers/wordReducer';
import { scoreReducer } from './reducers/scoreReducer.js';
import { stepReducer } from "./reducers/stepReducer.js"
// Contexts
import {
  WordContext,
  DataContext,
  GuessContext,
  FoundWordsContext,
  MessagesContext,
  StepsContext
} from './contexts/Contexts.js';

// Components
import { Word } from './components/Word.jsx';
import { Levels } from './components/Levels.jsx';
import { Header } from './components/Header';
import { Honeycomb } from './components/Honeycomb';
import { Messages } from './components/Messages.jsx';
import { MemoizedCorrectGuesses } from './components/MemoizedCorrectGuesses.jsx';
import { MemoizedWordsList } from './components/MemoizedWordsList.jsx';

// CSS
import './App.css';

function App() {
  const [data, setData] = useState();
  const [word, dispatchWord] = useReducer(wordReducer, { content: '' });
  const [guess, dispatchGuess] = useReducer(scoreReducer, { score: 0 });
  const [foundWords, setFoundWords] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [step, dispatchStep] = useReducer(stepReducer, { level: 0 })

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/api/data.json', {
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await result.json();
      setData(json.data.today);
    }
    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <>
      <WordContext.Provider value={[word, dispatchWord]}>
        <DataContext.Provider value={data}>
          <GuessContext.Provider value={[guess, dispatchGuess]}>
            <FoundWordsContext.Provider value={[foundWords, setFoundWords]}>
              <MessagesContext.Provider
                value={[showMessage, setShowMessage]}>
                <StepsContext.Provider value={[step, dispatchStep]}>
                  <Header />
                  <main className="app-container">
                    <section className="container">
                      <Messages />
                      <Levels />
                      <MemoizedCorrectGuesses />
                      <section className="words">
                        <Word />
                      </section>
                      <div className="inputs">
                        <div className="center">
                          <Honeycomb />
                        </div>
                      </div>
                    </section>
                    <section className="words-container">
                      <MemoizedWordsList />
                    </section>
                  </main>
                </StepsContext.Provider>
              </MessagesContext.Provider>
            </FoundWordsContext.Provider>
          </GuessContext.Provider>
        </DataContext.Provider>
      </WordContext.Provider>
    </>
  );
}

export default App;
