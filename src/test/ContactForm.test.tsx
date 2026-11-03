import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { showError, showSuccess } from '@/lib/alerts';
import { sendContactMessage } from '@/lib/firebase/contact';
import ContactForm from '@/components/sections/ContactForm';

jest.mock('@/lib/firebase/contact', () => ({ sendContactMessage: jest.fn() }));
jest.mock('@/lib/alerts', () => ({ showSuccess: jest.fn(), showError: jest.fn() }));

const mockSend = jest.mocked(sendContactMessage);
const mockShowSuccess = jest.mocked(showSuccess);
const mockShowError = jest.mocked(showError);

const sendButton = () => screen.getByRole('button', { name: 'contact.form.send' });

/** Types valid values into every visible field. */
async function fillValidForm(user: UserEvent) {
  await user.type(screen.getByLabelText('contact.form.name'), 'Jane Doe');
  await user.type(screen.getByLabelText('contact.form.email'), 'jane@example.com');
  await user.type(screen.getByLabelText('contact.form.subject'), 'Hello there');
  await user.type(screen.getByLabelText('contact.form.message'), 'This is a test message.');
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSend.mockResolvedValue(undefined);
    mockShowSuccess.mockResolvedValue({} as Awaited<ReturnType<typeof showSuccess>>);
    mockShowError.mockResolvedValue({} as Awaited<ReturnType<typeof showError>>);
  });

  it('keeps the submit button disabled until the form is valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    expect(sendButton()).toBeDisabled();
    await fillValidForm(user);
    await waitFor(() => expect(sendButton()).toBeEnabled());
  });

  it('shows a validation message for an invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText('contact.form.email'), 'not-an-email');

    expect(await screen.findByText('validation.email')).toBeInTheDocument();
  });

  it('sends the message, notifies the visitor and clears the form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await waitFor(() => expect(sendButton()).toBeEnabled());
    await user.click(sendButton());

    await waitFor(() =>
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
          subject: 'Hello there',
          message: 'This is a test message.',
        }),
      ),
    );
    expect(mockShowSuccess).toHaveBeenCalledWith('contact.successTitle', 'contact.successText');
    await waitFor(() => expect(screen.getByLabelText('contact.form.name')).toHaveValue(''));
  });

  it('shows an error alert when sending fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockSend.mockRejectedValue(new Error('network'));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await waitFor(() => expect(sendButton()).toBeEnabled());
    await user.click(sendButton());

    await waitFor(() =>
      expect(mockShowError).toHaveBeenCalledWith('contact.errorTitle', 'contact.errorText'),
    );
    expect(mockShowSuccess).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('silently ignores submissions that fill the honeypot field', async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await fillValidForm(user);
    await user.type(container.querySelector('input[name="website"]')!, 'spam');
    await waitFor(() => expect(sendButton()).toBeEnabled());
    await user.click(sendButton());

    await waitFor(() => expect(screen.getByLabelText('contact.form.name')).toHaveValue(''));
    expect(mockSend).not.toHaveBeenCalled();
    expect(mockShowSuccess).not.toHaveBeenCalled();
  });
});