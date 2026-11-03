import '@testing-library/jest-dom';

// In tests, `t(key)` simply returns the key, so assertions don't depend on wording.
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));