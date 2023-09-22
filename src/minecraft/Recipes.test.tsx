import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import { render, screen } from '@testing-library/react';
import { Recipes } from './Recipes';
import userEvent from '@testing-library/user-event';

const testInput = `/setblock 10 -60 1 minecraft:crafting_table{
  Items:[
    {Count:1b,Slot:0b,id:"minecraft:grass_block"},
    {Count:1b,Slot:1b,id:"minecraft:podzol"},
    {Count:1b,Slot:2b,id:"minecraft:mycelium"},
    {Count:1b,Slot:3b,id:"minecraft:clay"},
    {Count:1b,Slot:4b,id:"minecraft:gravel"},
    {Count:1b,Slot:5b,id:"minecraft:sand"},
    {Count:1b,Slot:6b,id:"minecraft:prismarine"},
    {Count:1b,Slot:7b,id:"minecraft:magma_block"},
    {Count:1b,Slot:8b,id:"minecraft:obsidian"}
  ]
}`;

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('Recipes', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Recipes />);
  });

  it('renders the page', () => {
    expect(
      screen.getByRole('heading', { name: 'Recipe to Clipboard' })
    ).toBeInTheDocument();
  });

  describe('Success', () => {
    it('shows a success message when copying a shaped recipe', async () => {
      userEvent.paste(
        screen.getByPlaceholderText('Paste your data here...'),
        testInput
      );

      userEvent.click(screen.getByRole('button', { name: 'Copy Shaped' }));

      expect(navigator.clipboard.writeText)
        .toBeCalledWith(`replaceShaped(1, "??????????", ["ABC","DEF","GHI"],{
        A: "minecraft:grass_block",B: "minecraft:podzol",C: "minecraft:mycelium",D: "minecraft:clay",E: "minecraft:gravel",F: "minecraft:sand",G: "minecraft:prismarine",H: "minecraft:magma_block",I: "minecraft:obsidian"
      })`);
    });

    it('shows a success message when copying a shapeless recipe', async () => {
      userEvent.paste(
        screen.getByPlaceholderText('Paste your data here...'),
        testInput
      );

      userEvent.click(screen.getByRole('button', { name: 'Copy Shapeless' }));

      expect(navigator.clipboard.writeText).toBeCalledWith(
        `replaceShapeless(1, "??????????", ["minecraft:grass_block","minecraft:podzol","minecraft:mycelium","minecraft:clay","minecraft:gravel","minecraft:sand","minecraft:prismarine","minecraft:magma_block","minecraft:obsidian"])`
      );
    });
  });

  describe('Error', () => {
    it('shows an error message when pasting bad data', async () => {
      userEvent.paste(
        screen.getByPlaceholderText('Paste your data here...'),
        '{}'
      );

      userEvent.click(screen.getByRole('button', { name: 'Copy Shaped' }));

      expect(toast.error).toBeCalled();
    });

    it('shows an error message when failing to copy a shaped recipe', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Copy Shaped' }));

      expect(toast.error).toBeCalled();
    });

    it('shows an error message when failing to copy a shapeless recipe', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Copy Shapeless' }));

      expect(toast.error).toBeCalled();
    });
  });
});
