import { useCallback } from 'react';
import { useJapaneseContext } from './JapaneseContext';
import { CharType, HiraganaType, Hiragana, katakana } from './JapaneseLanguage';

const JapaneseStart = () => {
  const { setIsPracticing, resetAll, shuffleLetters } = useJapaneseContext();

  const getLetters = (letters: HiraganaType[], types: CharType[]) => {
    const tempLetters = letters.filter((entry) => {
      return types.includes(entry.type);
    });
    return tempLetters;
  };

  const startJapanese = useCallback(
    (letters: HiraganaType[], types: CharType[]) => {
      resetAll();
      shuffleLetters(getLetters(letters, types));
      setIsPracticing(true);
    },
    [resetAll, setIsPracticing, shuffleLetters]
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
            <div role='button' className='secondary' style={{ margin: '6px' }}>
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
            <div role='button' className='secondary' style={{ margin: '6px' }}>
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
