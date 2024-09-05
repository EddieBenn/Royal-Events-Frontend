import { toast } from 'react-toastify';

export const showToast = (message:string) => {
    toast(message)
}

export const showSuccessToast = (message:string) => {
    toast.success(message)
}

export const showErrorToast = (message:string) => {
    toast.error(message)
}

export { toast };
