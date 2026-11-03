import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/layout/ThemeToggle';

jest.mock('next-themes', () => ({ useTheme: jest.fn() }));

const setTheme = jest.fn();
const mockUseTheme = jest.mocked(useTheme);

describe('ThemeToggle', () => {
  beforeEach(() => setTheme.mockClear());

  it.each([
    ['dark', 'light'],
    ['light', 'dark'],
  ])('switches from %s to %s', async (current, next) => {
    mockUseTheme.mockReturnValue({
      resolvedTheme: current,
      setTheme,
    } as unknown as ReturnType<typeof useTheme>);

    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole('button', { name: 'theme.toggle' }));

    expect(setTheme).toHaveBeenCalledWith(next);
  });
});