import reducer, {
  closeMobileMenu,
  setBlogSearch,
  setProjectFilter,
  toggleMobileMenu,
} from '@/store/slices/uiSlice';

const initial = reducer(undefined, { type: '@@INIT' });

describe('uiSlice', () => {
  it('has the expected initial state', () => {
    expect(initial).toEqual({ isMobileMenuOpen: false, projectFilter: 'all', blogSearch: '' });
  });

  it('toggles the mobile menu', () => {
    const opened = reducer(initial, toggleMobileMenu());
    expect(opened.isMobileMenuOpen).toBe(true);
    expect(reducer(opened, toggleMobileMenu()).isMobileMenuOpen).toBe(false);
  });

  it('closes the mobile menu', () => {
    const opened = reducer(initial, toggleMobileMenu());
    expect(reducer(opened, closeMobileMenu()).isMobileMenuOpen).toBe(false);
  });

  it('stores the project filter', () => {
    expect(reducer(initial, setProjectFilter('ecommerce')).projectFilter).toBe('ecommerce');
  });

  it('stores the blog search text', () => {
    expect(reducer(initial, setBlogSearch('redux')).blogSearch).toBe('redux');
  });
});