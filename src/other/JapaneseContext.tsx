import moment from 'moment';
import { Moment } from 'moment';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { KanaType } from './JapaneseLanguage';

interface JapaneseProps {
  isPracticing: boolean;
  isCorrect: boolean | undefined;
  isAnswered: boolean;
  isFinished: boolean;
  kanas: KanaType[];
  successful: string[];
  startTime: Moment | undefined;
  endTime: Moment | undefined;
  stats: number[];
  answer: string;
  index: number;
  setIsPracticing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setKanas: React.Dispatch<React.SetStateAction<KanaType[]>>;
  setSuccessful: React.Dispatch<React.SetStateAction<string[]>>;
  setStartTime: React.Dispatch<React.SetStateAction<Moment | undefined>>;
  setEndTime: React.Dispatch<React.SetStateAction<Moment | undefined>>;
  setStats: React.Dispatch<React.SetStateAction<number[]>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  nextQuestion: () => void;
  resetAnswer: () => void;
  resetAll: () => void;
  shuffleKanas: (array: KanaType[]) => void;
}

const JapaneseContext = createContext<JapaneseProps>({
  isPracticing: false,
  isCorrect: undefined,
  isAnswered: false,
  isFinished: false,
  kanas: [],
  successful: [],
  startTime: undefined,
  endTime: undefined,
  stats: [],
  answer: '',
  index: 0,
  setIsPracticing: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Provider not given.');
  },
  setIsCorrect: function (
    _value: React.SetStateAction<boolean | undefined>
  ): void {
    throw new Error('Provider not given.');
  },
  setIsAnswered: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Provider not given.');
  },
  setIsFinished: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Provider not given.');
  },
  setKanas: function (_value: React.SetStateAction<KanaType[]>): void {
    throw new Error('Provider not given.');
  },
  setSuccessful: function (_value: React.SetStateAction<string[]>): void {
    throw new Error('Provider not given.');
  },
  setStartTime: function (
    _value: React.SetStateAction<Moment | undefined>
  ): void {
    throw new Error('Provider not given.');
  },
  setEndTime: function (
    _value: React.SetStateAction<Moment | undefined>
  ): void {
    throw new Error('Provider not given.');
  },
  setStats: function (_value: React.SetStateAction<number[]>): void {
    throw new Error('Provider not given.');
  },
  setAnswer: function (_value: React.SetStateAction<string>): void {
    throw new Error('Provider not given.');
  },
  setIndex: function (_value: React.SetStateAction<number>): void {
    throw new Error('Provider not given.');
  },
  nextQuestion: function (): void {
    throw new Error('Provider not given.');
  },
  resetAnswer: function (): void {
    throw new Error('Provider not given.');
  },
  resetAll: function (): void {
    throw new Error('Provider not given.');
  },
  shuffleKanas: function (): void {
    throw new Error('Provider not given.');
  },
});

const JapaneseProvider = ({ children }: React.PropsWithChildren) => {
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [kanas, setKanas] = useState<KanaType[]>([]);
  const [successful, setSuccessful] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Moment | undefined>();
  const [endTime, setEndTime] = useState<Moment | undefined>();

  const [stats, setStats] = useState<number[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const shuffleLetters = (array: KanaType[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setKanas(array);
  };

  const resetAnswer = useCallback(() => {
    setAnswer('');
    setIsCorrect(undefined);
    setIsAnswered(false);
  }, [setAnswer, setIsAnswered, setIsCorrect]);

  const nextQuestion = useCallback(() => {
    if (index < kanas.length - 1) {
      setIndex(index + 1);
      resetAnswer();
    } else {
      const newEndTime = moment();
      const timeDiff = newEndTime?.diff(startTime);
      const newStatTime = [...stats, timeDiff];
      setEndTime(newEndTime);
      setStats(newStatTime);
      localStorage.setItem('stats', newStatTime.toString());
      setIsFinished(true);
    }
  }, [
    index,
    kanas.length,
    resetAnswer,
    setEndTime,
    setIndex,
    setIsFinished,
    setStats,
    startTime,
    stats,
  ]);

  const resetAll = useCallback(() => {
    setStartTime(moment());
    resetAnswer();
    setIsFinished(false);
    setSuccessful([]);
    setIndex(0);
  }, [resetAnswer]);

  return (
    <JapaneseContext.Provider
      value={{
        isPracticing,
        isCorrect,
        isAnswered,
        isFinished,
        kanas,
        successful,
        startTime,
        endTime,
        stats,
        answer,
        index,
        setIsPracticing,
        setIsCorrect,
        setIsAnswered,
        setIsFinished,
        setKanas,
        setSuccessful,
        setStartTime,
        setEndTime,
        setStats,
        setAnswer,
        setIndex,
        nextQuestion,
        resetAnswer,
        resetAll,
        shuffleKanas: shuffleLetters,
      }}
    >
      {children}
    </JapaneseContext.Provider>
  );
};

function useJapaneseContext() {
  return useContext(JapaneseContext);
}

export { JapaneseProvider, useJapaneseContext };
