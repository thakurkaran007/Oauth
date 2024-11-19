"use client"

import * as z from "zod"
import { CardWrapper } from "./cardWrapper"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from '@/components/ui/form'
import { LoginSchema, ResetSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/Button"
import { FormError } from "../form-error"
import Login from "@/actions/login"
import { useState, useTransition } from "react"
import { FormSuccess } from "../Form-success"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        startTransition(() => {
            reset(values)
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" placeholder='xyz@gmail.com' disabled={isPending}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    {success && <FormSuccess message={success}/>}
                    {error && <FormError message={error}/>}
                    <Button type="submit" className="w-full">{`${isPending ? "Sending" : "Send Verification Mail"}`}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
} 