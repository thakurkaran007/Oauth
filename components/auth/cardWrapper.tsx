"use client"

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Header } from './Header';
import { Social } from './Social';
import { BackButton } from './Backbutton';

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial = true
}: CardWrapperProps) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}  
            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social/>
                    </CardFooter>
                )
            }
            <BackButton label={backButtonLabel} href={backButtonHref}/>
        </Card>
    )
}