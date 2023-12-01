import { render, screen } from '@testing-library/react';
import { Hiragana, katakana } from './JapaneseLanguage';
import { Japanese } from './Japanese';
import userEvent from '@testing-library/user-event';

describe('Japanese', () => {
  describe.each([
    ['Hiragana', Hiragana],
    ['Katakana', katakana],
  ])('%s', (title, alphabet) => {
    it('can determine the correct character when checking the answer', async () => {
      render(<Japanese />);

      userEvent.click(screen.getByRole('button', { name: title }));

      for await (const _ of alphabet) {
        const letter = screen.getByRole('heading', {
          name: 'letter',
        }).innerHTML;
        const answer = alphabet.find((kanji) => kanji.kana === letter);
        userEvent.type(
          screen.getByRole('textbox', { name: 'answer' }),
          answer?.roumaji || ''
        );
        userEvent.keyboard('');
        userEvent.click(await screen.findByRole('button', { name: 'Next' }));
      }
    });
  });
});
