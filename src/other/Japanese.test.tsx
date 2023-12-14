import { render, screen } from '@testing-library/react';
import { Hiragana, katakana } from './JapaneseLanguage';
import { Japanese } from './Japanese';
import userEvent from '@testing-library/user-event';

const kana = {
  kana: 'あ',
  roumaji: 'a',
  type: 'gojuuon',
};

jest.mock('./JapaneseLanguage', () => ({
  Hiragana: [kana],
  katakana: [kana],
}));

describe('Japanese', () => {
  it('can check for correct answer', () => {
    render(<Japanese />);
    userEvent.click(screen.getByRole('button', { name: /Hiragana/ }));

    const answerInput = screen.getByRole('textbox');

    userEvent.type(answerInput, 'a');
    userEvent.type(answerInput, '{enter}');

    expect(answerInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('can check for wrong answer', () => {
    render(<Japanese />);
    userEvent.click(screen.getByRole('button', { name: /Hiragana/ }));

    const answerInput = screen.getByRole('textbox');

    userEvent.type(answerInput, 'b');
    userEvent.type(answerInput, '{enter}');

    expect(answerInput).toHaveAttribute('aria-invalid', 'true');
  });
});
