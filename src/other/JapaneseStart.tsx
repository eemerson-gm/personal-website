import { useCallback } from 'react';
import { Difficulty, useJapaneseContext } from './JapaneseContext';
import { CharType, KanaType, Hiragana, katakana } from './JapaneseLanguage';

const JapaneseStart = () => {
  const { setIsPracticing, resetAll, shuffleKanas, setDifficulty } =
    useJapaneseContext();

  const getLetters = (kanas: KanaType[], types: CharType[]) => {
    const tempLetters = kanas.filter((entry) => {
      return types.includes(entry.type);
    });
    return tempLetters;
  };

  const startJapanese = useCallback(
    (kanas: KanaType[], types: CharType[]) => {
      resetAll();
      shuffleKanas(getLetters(kanas, types));
      setIsPracticing(true);
    },
    [resetAll, setIsPracticing, shuffleKanas]
  );

  return (
    <>
      <article>
        <header>
          <hgroup style={{ margin: 0 }}>
            <h2>Japanese Practice</h2>
            <h3>Learn the japanese alphabet with these flash prompts.</h3>
          </hgroup>
        </header>
        <button onClick={() => startJapanese(Hiragana, ['gojuuon'])}>
          Hiragana
        </button>
        <button onClick={() => startJapanese(katakana, ['gojuuon'])}>
          Katakana
        </button>
        <fieldset
          style={{
            display: 'flex',
            gap: 16,
            width: '100%',
            flexDirection: 'row',
          }}
          onChange={(e) =>
            setDifficulty(
              Number((e.target as HTMLInputElement).value) as Difficulty
            )
          }
        >
          <label htmlFor='medium'>
            <input
              type='radio'
              id='medium'
              name='difficulty'
              value={Difficulty.MEDIUM}
              defaultChecked
            />
            Medium
          </label>
          <label htmlFor='hard'>
            <input
              type='radio'
              id='hard'
              name='difficulty'
              value={Difficulty.HARD}
            />
            Hard
          </label>
        </fieldset>
        <footer>
          Select an option to start the flash prompts. Your performance will be
          measured at the end of practice.
        </footer>
      </article>
      <article>
        <header>
          <h2 style={{ margin: 0 }}>Hiragana:</h2>
        </header>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {getLetters(Hiragana, ['gojuuon']).map((entry) => (
            <div
              key={entry.roumaji}
              role='button'
              className='secondary'
              style={{ margin: '6px' }}
            >
              {entry.kana}
              <hr style={{ borderColor: 'white' }} />
              {entry.roumaji}
            </div>
          ))}
        </div>
      </article>
      <article>
        <header>
          <h2 style={{ margin: 0 }}>Katakana:</h2>
        </header>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {getLetters(katakana, ['gojuuon']).map((entry) => (
            <div
              key={entry.roumaji}
              role='button'
              className='secondary'
              style={{ margin: '6px' }}
            >
              {entry.kana}
              <hr style={{ borderColor: 'white' }} />
              {entry.roumaji}
            </div>
          ))}
        </div>
      </article>
    </>
  );
};

export { JapaneseStart };
