import moment from 'moment';
import { useCallback } from 'react';
import { useJapaneseContext } from './JapaneseContext';

const JapaneseQuestions = () => {
  const {
    isCorrect,
    isAnswered,
    kanas,
    answer,
    index,
    setIsCorrect,
    setIsAnswered,
    setIsFinished,
    setSuccessful,
    setEndTime,
    setAnswer,
    setIndex,
    nextQuestion,
  } = useJapaneseContext();

  const onEnterAnswer = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Enter') {
        if (!isAnswered) {
          const kana = kanas[index].roumaji;
          const correct = answer === kana;
          setIsCorrect(!correct);
          if (correct) {
            setSuccessful((prev) => [...prev, kana]);
          }
          setIsAnswered(true);
          return;
        }
        nextQuestion();
      }
    },
    [
      answer,
      index,
      isAnswered,
      kanas,
      nextQuestion,
      setIsAnswered,
      setIsCorrect,
      setSuccessful,
    ]
  );

  return (
    <article>
      <header>
        <h2 style={{ margin: 0 }}>
          Letter {index + 1}/{kanas.length}
          <button
            style={{
              float: 'right',
              margin: '4px',
              display: 'inline-block',
              width: 'auto',
            }}
            onClick={() => {
              setEndTime(moment());
              setIsFinished(true);
            }}
          >
            Finish
          </button>
          <button
            style={{
              float: 'right',
              margin: '4px',
              display: 'inline-block',
              width: 'auto',
            }}
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            Skip
          </button>
        </h2>
      </header>
      <h1 aria-label='kana'>
        {kanas[index].kana} {isAnswered && `→ ${kanas[index].roumaji}`}
      </h1>
      <footer>
        <input
          type='text'
          aria-label='answer'
          placeholder='Type your answer...'
          readOnly={isAnswered}
          onChange={(e) => setAnswer(e.target.value.toLowerCase())}
          onKeyDown={onEnterAnswer}
          aria-invalid={isCorrect}
          value={answer}
          autoFocus
        />
        {isAnswered && <button onClick={nextQuestion}>Next</button>}
      </footer>
    </article>
  );
};

export { JapaneseQuestions };
