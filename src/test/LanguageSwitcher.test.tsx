import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

jest.mock('next/navigation', () => ({
  usePathname: () => '/en/blog',
  useParams: () => ({ lang: 'en' }),
}));

// Plain anchor that doesn't try to navigate, so clicks are safe in jsdom.
jest.mock('next/link', () => {
  const { createElement } = jest.requireActual<typeof import('react')>('react');
  return {
    __esModule: true,
    default: ({ children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
      createElement(
        'a',
        {
          ...props,
          onClick: (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            onClick?.(event);
          },
        },
        children,
      ),
  };
});

describe('LanguageSwitcher', () => {
  it('links to the same page in the other language', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('link', { name: 'language.label' })).toHaveAttribute(
      'href',
      '/ar/blog',
    );
  });

  it('remembers the chosen language in a cookie', async () => {
    render(<LanguageSwitcher />);
    await userEvent.click(screen.getByRole('link', { name: 'language.label' }));
    expect(document.cookie).toContain('NEXT_LOCALE=ar');
  });
});