"use client"

import Link from 'next/link';
import { Button } from '../ui/Button';

interface BackButtonProps {
    href: string;
    label: string;
}

export const BackButton = ({href, label}: BackButtonProps) => {
    return (
        <Button variant={'link'} className='font-normal w-full ' size='sm' >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}