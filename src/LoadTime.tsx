import moment, { Moment } from 'moment';
import { ChangeEvent, useState } from 'react';

interface LogString {
  time: string;
  type: string;
  name: string;
  message: string;
}

interface LogEntry {
  time: Moment;
  type: string;
  name: string;
  message: string;
}

interface LoadTime {
  entryOld: LogEntry;
  entryNew: LogEntry;
  timeDiff: number;
}

interface HighLoadTime {
  name: string;
  time: number;
  messages: string[];
}

export default function LoadTimePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalLoadTime, setTotalLoadTime] = useState<string>('');
  const [loadTimes, setLoadTimes] = useState<HighLoadTime[]>();

  const msFormatted = (millis: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return (
      minutes + ' Minutes ' + (seconds < 10 ? '0' : '') + seconds + ' Seconds'
    );
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result;
        const extract = require('extract-string');
        const entries = extract(text)
          .pattern('[{time}] [{type}] [{name}/]: {message}')
          .map((entry: LogString) => ({
            ...entry,
            time: moment(entry.time, 'DDMMMYYYY hh:mm:ss.SSS'),
          })) as LogEntry[];
        let tempLoadTimes = [] as LoadTime[];
        let tempHighLoadTimes = [] as HighLoadTime[];
        for (let i = 0; i < entries.length; i++) {
          if (i < entries.length - 1) {
            const oldTime = entries[i].time;
            const newTime = entries[i + 1].time;
            tempLoadTimes.push({
              entryOld: entries[i],
              entryNew: entries[i + 1],
              timeDiff: Math.abs(oldTime.diff(newTime)),
            });
          }
        }
        tempLoadTimes.forEach((entry) => {
          const highIndex = tempHighLoadTimes.findIndex(
            (e) => e.name === entry.entryNew.name
          );
          if (highIndex < 0) {
            tempHighLoadTimes.push({
              name: entry.entryNew.name,
              time: entry.timeDiff,
              messages: [entry.entryNew.message],
            });
          } else {
            tempHighLoadTimes[highIndex].time += entry.timeDiff;
            tempHighLoadTimes[highIndex].messages.push(entry.entryNew.message);
          }
        });
        tempHighLoadTimes.sort((a, b) => {
          if (a.time > b.time) return -1;
          if (a.time < b.time) return 1;
          return 0;
        });
        setTotalLoadTime(
          msFormatted(
            tempHighLoadTimes.reduce((acc, entry) => acc + entry.time, 0)
          )
        );
        setLoadTimes(
          tempHighLoadTimes.filter((entry) => {
            return !(
              entry.name.indexOf('minecraft') > 0 ||
              entry.name.indexOf('forge') > 0
            );
          })
        );
      };
      setIsLoading(true);
      reader.readAsText(file);
    }
  };

  return (
    <>
      {!loadTimes && !isLoading && (
        <article>
          <header>Modpack Load Time Debugger</header>
          <input type='file' onChange={onUpload} />
          <footer>
            <ol>
              <li>Start your modpack</li>
              <li>Wait until title screen is shown</li>
              <li>Keep minecraft window open</li>
              <li>
                Upload your <b>/logs/latest.log</b> file
              </li>
            </ol>
          </footer>
        </article>
      )}
      {isLoading && !loadTimes && <article aria-busy='true'></article>}
      {loadTimes && (
        <article>
          Total:{' '}
          <kbd style={{ color: 'white', backgroundColor: '#3949ab' }}>
            {totalLoadTime}
          </kbd>
        </article>
      )}
      {loadTimes?.map((entry) => (
        <article>
          <header>
            <kbd style={{ color: 'white', backgroundColor: '#3949ab' }}>
              {entry.time}ms
            </kbd>
          </header>
          <details>
            <summary>{entry.name}</summary>
            <p>
              <ul>
                {entry.messages.map((msg) => (
                  <li>{msg}</li>
                ))}
              </ul>
            </p>
          </details>
        </article>
      ))}
    </>
  );
}
