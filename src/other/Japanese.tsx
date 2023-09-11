import { useEffect } from 'react';
import { JapaneseProvider, useJapaneseContext } from './JapaneseContext';
import { JapaneseQuestions } from './JapaneseQuestions';
import { JapaneseFinished } from './JapaneseFinished';
import { JapaneseStart } from './JapaneseStart';

const Japanese = () => {
  const { isPracticing, isFinished, setStats } = useJapaneseContext();

  useEffect(() => {
    const times = localStorage.getItem('stats');
    if (times) {
      setStats(times.split(',').map((time) => Number(time)));
    }
  }, [setStats]);

  if (isPracticing && !isFinished) {
    return <JapaneseQuestions />;
  } else if (isFinished) {
    return <JapaneseFinished />;
  } else {
    return <JapaneseStart />;
  }
};

const JapaneseWrapper = () => {
  return (
    <JapaneseProvider>
      <Japanese />
    </JapaneseProvider>
  );
};

export { JapaneseWrapper as Japanese };
