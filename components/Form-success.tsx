
import { CheckCircledIcon } from '@radix-ui/react-icons';

interface successFormProps {
    message?: string | undefined;
}

export const FormSuccess = ({message}: successFormProps) => {

    if (!message) return <div></div>;

    return (
        <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500' >
            <CheckCircledIcon />
            <p>{message}</p>
        </div>
    );
};
