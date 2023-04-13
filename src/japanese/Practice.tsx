/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, KeyboardEvent, useState } from 'react';

type CharType = 'gojuuon' | 'dakuon' | 'handakuon' | 'sokuon' | 'youon';
interface HiriganaType {
  kana: string;
  roumaji: string;
  type: CharType;
}

const hirigana = [
  {
    kana: 'あ',
    roumaji: 'a',
    type: 'gojuuon',
  },
  {
    kana: 'い',
    roumaji: 'i',
    type: 'gojuuon',
  },
  {
    kana: 'う',
    roumaji: 'u',
    type: 'gojuuon',
  },
  {
    kana: 'え',
    roumaji: 'e',
    type: 'gojuuon',
  },
  {
    kana: 'お',
    roumaji: 'o',
    type: 'gojuuon',
  },
  {
    kana: 'か',
    roumaji: 'ka',
    type: 'gojuuon',
  },
  {
    kana: 'き',
    roumaji: 'ki',
    type: 'gojuuon',
  },
  {
    kana: 'く',
    roumaji: 'ku',
    type: 'gojuuon',
  },
  {
    kana: 'け',
    roumaji: 'ke',
    type: 'gojuuon',
  },
  {
    kana: 'こ',
    roumaji: 'ko',
    type: 'gojuuon',
  },
  {
    kana: 'さ',
    roumaji: 'sa',
    type: 'gojuuon',
  },
  {
    kana: 'し',
    roumaji: 'shi',
    type: 'gojuuon',
  },
  {
    kana: 'す',
    roumaji: 'su',
    type: 'gojuuon',
  },
  {
    kana: 'せ',
    roumaji: 'se',
    type: 'gojuuon',
  },
  {
    kana: 'そ',
    roumaji: 'so',
    type: 'gojuuon',
  },
  {
    kana: 'た',
    roumaji: 'ta',
    type: 'gojuuon',
  },
  {
    kana: 'ち',
    roumaji: 'chi',
    type: 'gojuuon',
  },
  {
    kana: 'つ',
    roumaji: 'tsu',
    type: 'gojuuon',
  },
  {
    kana: 'て',
    roumaji: 'te',
    type: 'gojuuon',
  },
  {
    kana: 'と',
    roumaji: 'to',
    type: 'gojuuon',
  },
  {
    kana: 'な',
    roumaji: 'na',
    type: 'gojuuon',
  },
  {
    kana: 'に',
    roumaji: 'ni',
    type: 'gojuuon',
  },
  {
    kana: 'ぬ',
    roumaji: 'nu',
    type: 'gojuuon',
  },
  {
    kana: 'ね',
    roumaji: 'ne',
    type: 'gojuuon',
  },
  {
    kana: 'の',
    roumaji: 'no',
    type: 'gojuuon',
  },
  {
    kana: 'は',
    roumaji: 'ha',
    type: 'gojuuon',
  },
  {
    kana: 'ひ',
    roumaji: 'hi',
    type: 'gojuuon',
  },
  {
    kana: 'ふ',
    roumaji: 'fu',
    type: 'gojuuon',
  },
  {
    kana: 'へ',
    roumaji: 'he',
    type: 'gojuuon',
  },
  {
    kana: 'ほ',
    roumaji: 'ho',
    type: 'gojuuon',
  },
  {
    kana: 'ま',
    roumaji: 'ma',
    type: 'gojuuon',
  },
  {
    kana: 'み',
    roumaji: 'mi',
    type: 'gojuuon',
  },
  {
    kana: 'む',
    roumaji: 'mu',
    type: 'gojuuon',
  },
  {
    kana: 'め',
    roumaji: 'me',
    type: 'gojuuon',
  },
  {
    kana: 'も',
    roumaji: 'mo',
    type: 'gojuuon',
  },
  {
    kana: 'や',
    roumaji: 'ya',
    type: 'gojuuon',
  },
  {
    kana: 'ゆ',
    roumaji: 'yu',
    type: 'gojuuon',
  },
  {
    kana: 'よ',
    roumaji: 'yo',
    type: 'gojuuon',
  },
  {
    kana: 'ら',
    roumaji: 'ra',
    type: 'gojuuon',
  },
  {
    kana: 'り',
    roumaji: 'ri',
    type: 'gojuuon',
  },
  {
    kana: 'る',
    roumaji: 'ru',
    type: 'gojuuon',
  },
  {
    kana: 'れ',
    roumaji: 're',
    type: 'gojuuon',
  },
  {
    kana: 'ろ',
    roumaji: 'ro',
    type: 'gojuuon',
  },
  {
    kana: 'わ',
    roumaji: 'wa',
    type: 'gojuuon',
  },
  {
    kana: 'を',
    roumaji: 'wo',
    type: 'gojuuon',
  },
  {
    kana: 'ん',
    roumaji: 'n',
    type: 'gojuuon',
  },
  {
    kana: 'が',
    roumaji: 'ga',
    type: 'dakuon',
  },
  {
    kana: 'ぎ',
    roumaji: 'gi',
    type: 'dakuon',
  },
  {
    kana: 'ぐ',
    roumaji: 'gu',
    type: 'dakuon',
  },
  {
    kana: 'げ',
    roumaji: 'ge',
    type: 'dakuon',
  },
  {
    kana: 'ご',
    roumaji: 'go',
    type: 'dakuon',
  },
  {
    kana: 'ざ',
    roumaji: 'za',
    type: 'dakuon',
  },
  {
    kana: 'じ',
    roumaji: 'ji',
    type: 'dakuon',
  },
  {
    kana: 'ず',
    roumaji: 'zu',
    type: 'dakuon',
  },
  {
    kana: 'ぜ',
    roumaji: 'ze',
    type: 'dakuon',
  },
  {
    kana: 'ぞ',
    roumaji: 'zo',
    type: 'dakuon',
  },
  {
    kana: 'だ',
    roumaji: 'da',
    type: 'dakuon',
  },
  {
    kana: 'ぢ',
    roumaji: 'ji',
    type: 'dakuon',
  },
  {
    kana: 'づ',
    roumaji: 'zu',
    type: 'dakuon',
  },
  {
    kana: 'で',
    roumaji: 'de',
    type: 'dakuon',
  },
  {
    kana: 'ど',
    roumaji: 'do',
    type: 'dakuon',
  },
  {
    kana: 'ば',
    roumaji: 'ba',
    type: 'dakuon',
  },
  {
    kana: 'び',
    roumaji: 'bi',
    type: 'dakuon',
  },
  {
    kana: 'ぶ',
    roumaji: 'bu',
    type: 'dakuon',
  },
  {
    kana: 'べ',
    roumaji: 'be',
    type: 'dakuon',
  },
  {
    kana: 'ぼ',
    roumaji: 'bo',
    type: 'dakuon',
  },
  {
    kana: 'ぱ',
    roumaji: 'pa',
    type: 'handakuon',
  },
  {
    kana: 'ぴ',
    roumaji: 'pi',
    type: 'handakuon',
  },
  {
    kana: 'ぷ',
    roumaji: 'pu',
    type: 'handakuon',
  },
  {
    kana: 'ぺ',
    roumaji: 'pe',
    type: 'handakuon',
  },
  {
    kana: 'ぽ',
    roumaji: 'po',
    type: 'handakuon',
  },
  {
    kana: 'っ',
    roumaji: '(pause)',
    type: 'sokuon',
  },
  {
    kana: 'きゃ',
    roumaji: 'kya',
    type: 'youon',
  },
  {
    kana: 'きゅ',
    roumaji: 'kyu',
    type: 'youon',
  },
  {
    kana: 'きょ',
    roumaji: 'kyo',
    type: 'youon',
  },
  {
    kana: 'しゃ',
    roumaji: 'sha',
    type: 'youon',
  },
  {
    kana: 'しゅ',
    roumaji: 'shu',
    type: 'youon',
  },
  {
    kana: 'しょ',
    roumaji: 'sho',
    type: 'youon',
  },
  {
    kana: 'ちゃ',
    roumaji: 'cha',
    type: 'youon',
  },
  {
    kana: 'ちゅ',
    roumaji: 'chu',
    type: 'youon',
  },
  {
    kana: 'ちょ',
    roumaji: 'cho',
    type: 'youon',
  },
  {
    kana: 'にゃ',
    roumaji: 'nya',
    type: 'youon',
  },
  {
    kana: 'にゅ',
    roumaji: 'nyu',
    type: 'youon',
  },
  {
    kana: 'にょ',
    roumaji: 'nyo',
    type: 'youon',
  },
  {
    kana: 'ひゃ',
    roumaji: 'hya',
    type: 'youon',
  },
  {
    kana: 'ひゅ',
    roumaji: 'hyu',
    type: 'youon',
  },
  {
    kana: 'ひょ',
    roumaji: 'hyo',
    type: 'youon',
  },
  {
    kana: 'みゃ',
    roumaji: 'mya',
    type: 'youon',
  },
  {
    kana: 'みゅ',
    roumaji: 'myu',
    type: 'youon',
  },
  {
    kana: 'みょ',
    roumaji: 'myo',
    type: 'youon',
  },
  {
    kana: 'りゃ',
    roumaji: 'rya',
    type: 'youon',
  },
  {
    kana: 'りゅ',
    roumaji: 'ryu',
    type: 'youon',
  },
  {
    kana: 'りょ',
    roumaji: 'ryo',
    type: 'youon',
  },
  {
    kana: 'ぎゃ',
    roumaji: 'gya',
    type: 'youon',
  },
  {
    kana: 'ぎゅ',
    roumaji: 'gyu',
    type: 'youon',
  },
  {
    kana: 'ぎょ',
    roumaji: 'gyo',
    type: 'youon',
  },
  {
    kana: 'じゃ',
    roumaji: 'ja',
    type: 'youon',
  },
  {
    kana: 'じゅ',
    roumaji: 'ju',
    type: 'youon',
  },
  {
    kana: 'じょ',
    roumaji: 'jo',
    type: 'youon',
  },
  {
    kana: 'びゃ',
    roumaji: 'bya',
    type: 'youon',
  },
  {
    kana: 'びゅ',
    roumaji: 'byu',
    type: 'youon',
  },
  {
    kana: 'びょ',
    roumaji: 'byo',
    type: 'youon',
  },
  {
    kana: 'ぴゃ',
    roumaji: 'pya',
    type: 'youon',
  },
  {
    kana: 'ぴゅ',
    roumaji: 'pyu',
    type: 'youon',
  },
  {
    kana: 'ぴょ',
    roumaji: 'pyo',
    type: 'youon',
  },
] as HiriganaType[];

const katakana = [
  {
    kana: 'ア',
    roumaji: 'a',
    type: 'gojuuon',
  },
  {
    kana: 'イ',
    roumaji: 'i',
    type: 'gojuuon',
  },
  {
    kana: 'ウ',
    roumaji: 'u',
    type: 'gojuuon',
  },
  {
    kana: 'エ',
    roumaji: 'e',
    type: 'gojuuon',
  },
  {
    kana: 'オ',
    roumaji: 'o',
    type: 'gojuuon',
  },
  {
    kana: 'カ',
    roumaji: 'ka',
    type: 'gojuuon',
  },
  {
    kana: 'キ',
    roumaji: 'ki',
    type: 'gojuuon',
  },
  {
    kana: 'ク',
    roumaji: 'ku',
    type: 'gojuuon',
  },
  {
    kana: 'ケ',
    roumaji: 'ke',
    type: 'gojuuon',
  },
  {
    kana: 'コ',
    roumaji: 'ko',
    type: 'gojuuon',
  },
  {
    kana: 'サ',
    roumaji: 'sa',
    type: 'gojuuon',
  },
  {
    kana: 'シ',
    roumaji: 'shi',
    type: 'gojuuon',
  },
  {
    kana: 'ス',
    roumaji: 'su',
    type: 'gojuuon',
  },
  {
    kana: 'セ',
    roumaji: 'se',
    type: 'gojuuon',
  },
  {
    kana: 'ソ',
    roumaji: 'so',
    type: 'gojuuon',
  },
  {
    kana: 'タ',
    roumaji: 'ta',
    type: 'gojuuon',
  },
  {
    kana: 'チ',
    roumaji: 'chi',
    type: 'gojuuon',
  },
  {
    kana: 'ツ',
    roumaji: 'tsu',
    type: 'gojuuon',
  },
  {
    kana: 'テ',
    roumaji: 'te',
    type: 'gojuuon',
  },
  {
    kana: 'ト',
    roumaji: 'to',
    type: 'gojuuon',
  },
  {
    kana: 'ナ',
    roumaji: 'na',
    type: 'gojuuon',
  },
  {
    kana: 'ニ',
    roumaji: 'ni',
    type: 'gojuuon',
  },
  {
    kana: 'ヌ',
    roumaji: 'nu',
    type: 'gojuuon',
  },
  {
    kana: 'ネ',
    roumaji: 'ne',
    type: 'gojuuon',
  },
  {
    kana: 'ノ',
    roumaji: 'no',
    type: 'gojuuon',
  },
  {
    kana: 'ハ',
    roumaji: 'ha',
    type: 'gojuuon',
  },
  {
    kana: 'ヒ',
    roumaji: 'hi',
    type: 'gojuuon',
  },
  {
    kana: 'フ',
    roumaji: 'fu',
    type: 'gojuuon',
  },
  {
    kana: 'ヘ',
    roumaji: 'he',
    type: 'gojuuon',
  },
  {
    kana: 'ホ',
    roumaji: 'ho',
    type: 'gojuuon',
  },
  {
    kana: 'マ',
    roumaji: 'ma',
    type: 'gojuuon',
  },
  {
    kana: 'ミ',
    roumaji: 'mi',
    type: 'gojuuon',
  },
  {
    kana: 'ム',
    roumaji: 'mu',
    type: 'gojuuon',
  },
  {
    kana: 'メ',
    roumaji: 'me',
    type: 'gojuuon',
  },
  {
    kana: 'モ',
    roumaji: 'mo',
    type: 'gojuuon',
  },
  {
    kana: 'ヤ',
    roumaji: 'ya',
    type: 'gojuuon',
  },
  {
    kana: 'ユ',
    roumaji: 'yu',
    type: 'gojuuon',
  },
  {
    kana: 'ヨ',
    roumaji: 'yo',
    type: 'gojuuon',
  },
  {
    kana: 'ラ',
    roumaji: 'ra',
    type: 'gojuuon',
  },
  {
    kana: 'リ',
    roumaji: 'ri',
    type: 'gojuuon',
  },
  {
    kana: 'ル',
    roumaji: 'ru',
    type: 'gojuuon',
  },
  {
    kana: 'レ',
    roumaji: 're',
    type: 'gojuuon',
  },
  {
    kana: 'ロ',
    roumaji: 'ro',
    type: 'gojuuon',
  },
  {
    kana: 'ワ',
    roumaji: 'wa',
    type: 'gojuuon',
  },
  {
    kana: 'ヲ',
    roumaji: 'wo',
    type: 'gojuuon',
  },
  {
    kana: 'ン',
    roumaji: 'n',
    type: 'gojuuon',
  },
  {
    kana: 'ガ',
    roumaji: 'ga',
    type: 'dakuon',
  },
  {
    kana: 'ギ',
    roumaji: 'gi',
    type: 'dakuon',
  },
  {
    kana: 'グ',
    roumaji: 'gu',
    type: 'dakuon',
  },
  {
    kana: 'ゲ',
    roumaji: 'ge',
    type: 'dakuon',
  },
  {
    kana: 'ゴ',
    roumaji: 'go',
    type: 'dakuon',
  },
  {
    kana: 'ザ',
    roumaji: 'za',
    type: 'dakuon',
  },
  {
    kana: 'ジ',
    roumaji: 'ji',
    type: 'dakuon',
  },
  {
    kana: 'ズ',
    roumaji: 'zu',
    type: 'dakuon',
  },
  {
    kana: 'ゼ',
    roumaji: 'ze',
    type: 'dakuon',
  },
  {
    kana: 'ゾ',
    roumaji: 'zo',
    type: 'dakuon',
  },
  {
    kana: 'ダ',
    roumaji: 'da',
    type: 'dakuon',
  },
  {
    kana: 'ヂ',
    roumaji: 'ji',
    type: 'dakuon',
  },
  {
    kana: 'ヅ',
    roumaji: 'zu',
    type: 'dakuon',
  },
  {
    kana: 'デ',
    roumaji: 'de',
    type: 'dakuon',
  },
  {
    kana: 'ド',
    roumaji: 'do',
    type: 'dakuon',
  },
  {
    kana: 'バ',
    roumaji: 'ba',
    type: 'dakuon',
  },
  {
    kana: 'ビ',
    roumaji: 'bi',
    type: 'dakuon',
  },
  {
    kana: 'ブ',
    roumaji: 'bu',
    type: 'dakuon',
  },
  {
    kana: 'ベ',
    roumaji: 'be',
    type: 'dakuon',
  },
  {
    kana: 'ボ',
    roumaji: 'bo',
    type: 'dakuon',
  },
  {
    kana: 'パ',
    roumaji: 'pa',
    type: 'handakuon',
  },
  {
    kana: 'ピ',
    roumaji: 'pi',
    type: 'handakuon',
  },
  {
    kana: 'プ',
    roumaji: 'pu',
    type: 'handakuon',
  },
  {
    kana: 'ペ',
    roumaji: 'pe',
    type: 'handakuon',
  },
  {
    kana: 'ポ',
    roumaji: 'po',
    type: 'handakuon',
  },
  {
    kana: 'ッ',
    roumaji: '(pause)',
    type: 'sokuon',
  },
  {
    kana: 'キャ',
    roumaji: 'kya',
    type: 'youon',
  },
  {
    kana: 'キュ',
    roumaji: 'kyu',
    type: 'youon',
  },
  {
    kana: 'キョ',
    roumaji: 'kyo',
    type: 'youon',
  },
  {
    kana: 'シャ',
    roumaji: 'sha',
    type: 'youon',
  },
  {
    kana: 'シュ',
    roumaji: 'shu',
    type: 'youon',
  },
  {
    kana: 'ショ',
    roumaji: 'sho',
    type: 'youon',
  },
  {
    kana: 'チャ',
    roumaji: 'cha',
    type: 'youon',
  },
  {
    kana: 'チュ',
    roumaji: 'chu',
    type: 'youon',
  },
  {
    kana: 'チョ',
    roumaji: 'cho',
    type: 'youon',
  },
  {
    kana: 'ニャ',
    roumaji: 'nya',
    type: 'youon',
  },
  {
    kana: 'ニュ',
    roumaji: 'nyu',
    type: 'youon',
  },
  {
    kana: 'ニョ',
    roumaji: 'nyo',
    type: 'youon',
  },
  {
    kana: 'ヒャ',
    roumaji: 'hya',
    type: 'youon',
  },
  {
    kana: 'ヒュ',
    roumaji: 'hyu',
    type: 'youon',
  },
  {
    kana: 'ヒョ',
    roumaji: 'hyo',
    type: 'youon',
  },
  {
    kana: 'ミャ',
    roumaji: 'mya',
    type: 'youon',
  },
  {
    kana: 'ミュ',
    roumaji: 'myu',
    type: 'youon',
  },
  {
    kana: 'ミョ',
    roumaji: 'myo',
    type: 'youon',
  },
  {
    kana: 'リャ',
    roumaji: 'rya',
    type: 'youon',
  },
  {
    kana: 'リュ',
    roumaji: 'ryu',
    type: 'youon',
  },
  {
    kana: 'リョ',
    roumaji: 'ryo',
    type: 'youon',
  },
  {
    kana: 'ギャ',
    roumaji: 'gya',
    type: 'youon',
  },
  {
    kana: 'ギュ',
    roumaji: 'gyu',
    type: 'youon',
  },
  {
    kana: 'ギョ',
    roumaji: 'gyo',
    type: 'youon',
  },
  {
    kana: 'ジャ',
    roumaji: 'ja',
    type: 'youon',
  },
  {
    kana: 'ジュ',
    roumaji: 'ju',
    type: 'youon',
  },
  {
    kana: 'ジョ',
    roumaji: 'jo',
    type: 'youon',
  },
  {
    kana: 'ビャ',
    roumaji: 'bya',
    type: 'youon',
  },
  {
    kana: 'ビュ',
    roumaji: 'byu',
    type: 'youon',
  },
  {
    kana: 'ビョ',
    roumaji: 'byo',
    type: 'youon',
  },
  {
    kana: 'ピャ',
    roumaji: 'pya',
    type: 'youon',
  },
  {
    kana: 'ピュ',
    roumaji: 'pyu',
    type: 'youon',
  },
  {
    kana: 'ピョ',
    roumaji: 'pyo',
    type: 'youon',
  },
] as HiriganaType[];

export default function PracticePage() {
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [letters, setLetters] = useState<HiriganaType[]>([]);
  const [successful, setSuccessful] = useState<string[]>([]);

  const [answer, setAnswer] = useState<string>();
  const [index, setIndex] = useState<number>(0);

  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetAnswer = () => {
    setAnswer('');
    setIsCorrect(undefined);
    setIsAnswered(false);
  };

  const resetAll = () => {
    resetAnswer();
    setIsFinished(false);
    setSuccessful([]);
    setIndex(0);
  };

  const startPractice = useCallback(
    (letters: HiriganaType[], types: CharType[]) => {
      const tempAlphabet = letters.filter((entry) => {
        return types.includes(entry.type);
      });
      setLetters(shuffleArray(tempAlphabet));
      setIsPracticing(true);
    },
    []
  );

  const onNextQuestion = useCallback(() => {
    if (index < letters.length - 1) {
      setIndex(index + 1);
      resetAnswer();
    } else {
      setIsFinished(true);
    }
  }, [index, letters.length]);

  const onEnterAnswer = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (!isAnswered) {
          const letter = letters[index].roumaji;
          const correct = answer === letter;
          setIsCorrect(!correct);
          if (correct) {
            setSuccessful((prev) => [...prev, letter]);
          }
          setIsAnswered(true);
          return;
        }
        onNextQuestion();
      }
    },
    [answer, index, isAnswered, letters, onNextQuestion]
  );

  if (isPracticing && !isFinished) {
    return (
      <article>
        <header>
          <h2 style={{ margin: 0 }}>
            Letter {index + 1}/{letters.length}
            <button
              style={{
                float: 'right',
                margin: '4px',
                display: 'inline-block',
                width: 'auto',
              }}
              onClick={() => {
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
        <h1>
          {letters[index].kana} {isAnswered && `→ ${letters[index].roumaji}`}
        </h1>
        <footer>
          <input
            type='text'
            placeholder='Type your answer...'
            readOnly={isAnswered}
            onChange={(e) => setAnswer(e.target.value.toLowerCase())}
            onKeyDown={onEnterAnswer}
            aria-invalid={isCorrect}
            value={answer}
            autoFocus
          />
          {isAnswered && <button onClick={onNextQuestion}>Next</button>}
        </footer>
      </article>
    );
  } else if (isFinished) {
    return (
      <article>
        <header>
          <h2 style={{ margin: 0 }}>Performance Report:</h2>
        </header>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {letters.map((entry) => (
            <a
              href='#'
              role='button'
              className={
                successful.includes(entry.roumaji) ? 'primary' : 'secondary'
              }
              style={{ margin: '6px' }}
            >
              {entry.kana}
            </a>
          ))}
        </div>
        <footer>
          <button
            style={{ margin: '4px', display: 'inline-block', width: 'auto' }}
            onClick={() => {
              setLetters(shuffleArray(letters));
              resetAll();
            }}
          >
            Retry Set
          </button>
          <button
            style={{ margin: '4px', display: 'inline-block', width: 'auto' }}
            onClick={() => {
              setLetters(
                shuffleArray(
                  letters.filter((entry) => {
                    return !successful.includes(entry.roumaji);
                  })
                )
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
    );
  } else {
    return (
      <article>
        <header>
          <hgroup style={{ margin: 0 }}>
            <h2>Japanese Practice</h2>
            <h3>Learn the japanese alphabet with these flash prompts.</h3>
          </hgroup>
        </header>
        <button onClick={() => startPractice(hirigana, ['gojuuon'])}>
          Hirigana
        </button>
        <button onClick={() => startPractice(katakana, ['gojuuon'])}>
          Katakana
        </button>
        <footer>
          Select an option to start the flash prompts. Your performance will be
          measured at the end of practice.
        </footer>
      </article>
    );
  }
}
