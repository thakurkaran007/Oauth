"use client"

import * as z from "zod"
import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from '@/components/ui/form'
import { NewPasswordSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/Button"
import { FormError } from "../form-error"
import { useState, useTransition } from "react"
import { FormSuccess } from "../Form-success"
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

export const NewPasswordForm = () => {
    const token = useSearchParams().get('token') || '';
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: '',
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setSuccess(data.success);
                    setError(data.error);
                })
                .catch((error) => {
                    setError(error);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel='Forgot Password!'
            backButtonLabel='Back to login'
            backButtonHref='/auth/login'
            showSocial={false}
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" placeholder='* * * * * *' disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    {success && <FormSuccess message={success}/>}
                    {error && <FormError message={error}/>}
                    {isPending ? <BeatLoader color='#2563EB' className="w-full " loading={isPending} size={10}/> : <Button type='submit' className="w-full">Submit</Button>}
                </form>
            </Form>
        </CardWrapper>
    )
} 