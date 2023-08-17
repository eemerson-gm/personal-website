import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StartupPage from './Startup';

describe('Startup', () => {
  it('renders the page', async () => {
    render(<StartupPage />);

    expect(
      await screen.findByRole('heading', { name: 'Startup Debugger' })
    ).toBeInTheDocument();
  });
});
