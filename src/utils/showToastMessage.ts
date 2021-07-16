import { toast } from 'react-toastify';

type showToastMessageParams = {
  type: 'success' | 'error';
  message: string;
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
};

export function showToastMessage({
  type,
  message,
  position = 'top-right',
}: showToastMessageParams) {
  switch (type) {
    case 'success':
      return toast.success(message, {
        position: position,
        autoClose: 5000,
      });

    case 'error':
      return toast.error(message, {
        position: position,
        autoClose: 5000,
      });

    default:
      return toast(message, {
        position: position,
        autoClose: 5000,
      });
  }
}
