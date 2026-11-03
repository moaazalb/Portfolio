import { contactFormSchema, contactSchema } from '@/lib/validations/contact';

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Hello there',
  message: 'This is a test message.',
};

describe('contactSchema', () => {
  it('accepts valid input', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('trims whitespace around values', () => {
    const result = contactSchema.parse({ ...valid, name: '  Jane Doe  ' });
    expect(result.name).toBe('Jane Doe');
  });

  it.each([
    ['name', '', 'validation.name'],
    ['name', '   ', 'validation.name'],
    ['name', 'x'.repeat(81), 'validation.name'],
    ['email', 'not-an-email', 'validation.email'],
    ['subject', 'hi', 'validation.subject'],
    ['message', 'too short', 'validation.message'],
    ['message', 'x'.repeat(2001), 'validation.message'],
  ])('rejects invalid %s (%j) with the right message key', (field, value, message) => {
    const result = contactSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(message);
  });
});

describe('contactFormSchema', () => {
  it('allows the optional honeypot field', () => {
    expect(contactFormSchema.safeParse({ ...valid, website: '' }).success).toBe(true);
  });
});