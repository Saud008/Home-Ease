import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showToast = {
  success: (message) => toast.success(message, toastConfig),
  error: (message) => toast.error(message, { ...toastConfig, autoClose: 7000 }),
  warning: (message) => toast.warning(message, toastConfig),
  info: (message) => toast.info(message, toastConfig)
};
