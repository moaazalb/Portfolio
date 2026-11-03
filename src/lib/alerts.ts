import Swal, { type SweetAlertIcon } from 'sweetalert2';

/** Whether the app is currently in dark mode. */
const isDark = (): boolean => document.documentElement.classList.contains('dark');

/**
 * Shows a themed alert that matches the current light/dark mode.
 * @param icon - Alert icon type.
 * @param title - Main message.
 * @param text - Optional secondary message.
 */
async function fire(icon: SweetAlertIcon, title: string, text?: string) {
  const dark = isDark();
  return Swal.fire({
    icon,
    title,
    text,
    background: dark ? '#18181b' : '#ffffff',
    color: dark ? '#fafafa' : '#18181b',
    confirmButtonColor: '#c026d3',
    heightAuto: false,
  });
}

/** Shows a success notification. */
export const showSuccess = (title: string, text?: string) => fire('success', title, text);

/** Shows an error notification. */
export const showError = (title: string, text?: string) => fire('error', title, text);

/** Shows a warning notification. */
export const showWarning = (title: string, text?: string) => fire('warning', title, text);

/**
 * Asks the user to confirm an action.
 * @returns `true` if the user confirmed.
 */
export async function confirmAction(
  title: string,
  confirmText: string,
  cancelText: string,
): Promise<boolean> {
  const dark = isDark();
  const result = await Swal.fire({
    icon: 'question',
    title,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    background: dark ? '#18181b' : '#ffffff',
    color: dark ? '#fafafa' : '#18181b',
    confirmButtonColor: '#c026d3',
    heightAuto: false,
  });
  return result.isConfirmed;
}