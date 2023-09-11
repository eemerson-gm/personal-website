import moment from 'moment';
import { useJapaneseContext } from './JapaneseContext';
import { Line } from 'react-chartjs-2';

const JapaneseFinished = () => {
  const {
    letters,
    successful,
    startTime,
    endTime,
    stats,
    setIsPracticing,
    setStats,
    resetAll,
    shuffleLetters,
  } = useJapaneseContext();

  return (
    <>
      <article>
        <header>
          <h2 style={{ margin: 0 }}>
            Performance Report:{' '}
            <div style={{ float: 'right' }}>
              {moment(endTime?.diff(startTime)).format('mm:ss.SSS')}
            </div>
          </h2>
        </header>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {letters.map((entry) => (
            <div
              role='button'
              className={
                successful.includes(entry.roumaji) ? 'primary' : 'secondary'
              }
              style={{ margin: '6px' }}
            >
              {entry.kana}
              <hr style={{ borderColor: 'white' }} />
              {entry.roumaji}
            </div>
          ))}
        </div>
        <footer>
          <button
            style={{ margin: '4px', display: 'inline-block', width: 'auto' }}
            onClick={() => {
              shuffleLetters(letters);
              resetAll();
            }}
          >
            Retry Set
          </button>
          <button
            style={{ margin: '4px', display: 'inline-block', width: 'auto' }}
            onClick={() => {
              shuffleLetters(
                letters.filter((entry) => {
                  return !successful.includes(entry.roumaji);
                })
              );
              resetAll();
            }}
          >
            Retry Failed
          </button>
          <button
            onClick={() => {
              setIsPracticing(false);
              resetAll();
            }}
            style={{ margin: '4px', display: 'inline-block', width: 'auto' }}
          >
            Back
          </button>
        </footer>
      </article>
      {stats.length ? (
        <article>
          <header>
            <h2 style={{ margin: 0 }}>
              Performance History:{' '}
              <button
                style={{
                  float: 'right',
                  display: 'inline-block',
                  width: 'auto',
                }}
                onClick={() => {
                  setStats([]);
                  localStorage.removeItem('stats');
                }}
              >
                Reset
              </button>
            </h2>
          </header>
          <Line
            options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Attempt',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Seconds',
                  },
                },
              },
            }}
            data={{
              labels: stats?.map((_, index) => `#${index + 1}`),
              datasets: [
                {
                  label: 'Completion time',
                  data: stats.map((stat) => stat / 1000),
                  borderColor: 'hsl(195deg, 85%, 41%)',
                  backgroundColor: 'hsl(195deg, 85%, 41%)',
                },
              ],
            }}
          />
        </article>
      ) : null}
    </>
  );
};

export { JapaneseFinished };
