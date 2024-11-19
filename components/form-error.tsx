import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface errorFormProps {
    message?: string | undefined;
}

export const FormError = ({message}: errorFormProps) => {

    if (!message) return <div></div>;

    return (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <ExclamationTriangleIcon />
            <p>{message}</p>
        </div>
    );
};