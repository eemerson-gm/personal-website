import moment from 'moment';
import { Moment } from 'moment';
import React, { createContext, useCallback, useContext, useState } from 'react';

type CharType = 'gojuuon' | 'dakuon' | 'handakuon' | 'sokuon' | 'youon';

interface HiriganaType {
  kana: string;
  roumaji: string;
  type: CharType;
}

interface PracticeProps {
  isPracticing: boolean;
  isCorrect: boolean | undefined;
  isAnswered: boolean;
  isFinished: boolean;
  letters: HiriganaType[];
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
  setLetters: React.Dispatch<React.SetStateAction<HiriganaType[]>>;
  setSuccessful: React.Dispatch<React.SetStateAction<string[]>>;
  setStartTime: React.Dispatch<React.SetStateAction<Moment | undefined>>;
  setEndTime: React.Dispatch<React.SetStateAction<Moment | undefined>>;
  setStats: React.Dispatch<React.SetStateAction<number[]>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  nextQuestion: () => void;
  resetAnswer: () => void;
  resetAll: () => void;
  shuffleLetters: (array: HiriganaType[]) => void;
}

const PracticeContext = createContext<PracticeProps>({
  isPracticing: false,
  isCorrect: undefined,
  isAnswered: false,
  isFinished: false,
  letters: [],
  successful: [],
  startTime: undefined,
  endTime: undefined,
  stats: [],
  answer: '',
  index: 0,
  setIsPracticing: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  setIsCorrect: function (
    _value: React.SetStateAction<boolean | undefined>
  ): void {
    throw new Error('Function not implemented.');
  },
  setIsAnswered: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  setIsFinished: function (_value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.');
  },
  setLetters: function (_value: React.SetStateAction<HiriganaType[]>): void {
    throw new Error('Function not implemented.');
  },
  setSuccessful: function (_value: React.SetStateAction<string[]>): void {
    throw new Error('Function not implemented.');
  },
  setStartTime: function (
    _value: React.SetStateAction<Moment | undefined>
  ): void {
    throw new Error('Function not implemented.');
  },
  setEndTime: function (
    _value: React.SetStateAction<Moment | undefined>
  ): void {
    throw new Error('Function not implemented.');
  },
  setStats: function (_value: React.SetStateAction<number[]>): void {
    throw new Error('Function not implemented.');
  },
  setAnswer: function (_value: React.SetStateAction<string>): void {
    throw new Error('Function not implemented.');
  },
  setIndex: function (_value: React.SetStateAction<number>): void {
    throw new Error('Function not implemented.');
  },
  nextQuestion: function (): void {
    throw new Error('Function not implemented.');
  },
  resetAnswer: function (): void {
    throw new Error('Function not implemented.');
  },
  resetAll: function (): void {
    throw new Error('Function not implemented.');
  },
  shuffleLetters: function (): void {
    throw new Error('Function not implemented.');
  },
});

function PracticeProvider({ children }: React.PropsWithChildren) {
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [letters, setLetters] = useState<HiriganaType[]>([]);
  const [successful, setSuccessful] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Moment | undefined>();
  const [endTime, setEndTime] = useState<Moment | undefined>();

  const [stats, setStats] = useState<number[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  const shuffleLetters = (array: HiriganaType[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setLetters(array);
  };

  const resetAnswer = useCallback(() => {
    setAnswer('');
    setIsCorrect(undefined);
    setIsAnswered(false);
  }, [setAnswer, setIsAnswered, setIsCorrect]);

  const nextQuestion = useCallback(() => {
    if (index < letters.length - 1) {
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
    letters.length,
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
    <PracticeContext.Provider
      value={{
        isPracticing,
        isCorrect,
        isAnswered,
        isFinished,
        letters,
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
        setLetters,
        setSuccessful,
        setStartTime,
        setEndTime,
        setStats,
        setAnswer,
        setIndex,
        nextQuestion,
        resetAnswer,
        resetAll,
        shuffleLetters,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

function usePracticeContext() {
  return useContext(PracticeContext);
}

export { PracticeProvider, usePracticeContext };
export type { HiriganaType, CharType };
