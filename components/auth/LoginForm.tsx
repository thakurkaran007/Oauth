    "use client"

    import * as z from "zod"
    import { CardWrapper } from "./cardWrapper"
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod"
    import { Form, FormControl, FormLabel, FormMessage, FormField, FormItem } from '@/components/ui/form'
    import { LoginSchema } from "@/schemas"
    import { Input } from "../ui/input"
    import { Button } from "../ui/Button"
    import { FormError } from "../form-error"
    import Login from "@/actions/login"
    import { useState, useTransition } from "react"
    import { FormSuccess } from "../Form-success"

    export const LoginForm = () => {
        const [error, setError] = useState<string | undefined>();
        const [success, setSuccess] = useState<string | undefined>();
        const [isPending, startTransition] = useTransition();

        const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        });

        const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {

                Login(values).then((res) => {
                    if ("error" in res) {
                        setError(res.error);
                    } else {
                        setSuccess(res.success);
                    }
                })
                
            })
        }

        return (
            <CardWrapper
                headerLabel='Welcome back!'
                backButtonLabel='Don’t have an account?'
                backButtonHref='/auth/signup'
                >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder='kthakur7@gmail.com' disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder='******' disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <FormSuccess message={success}/>
                        <FormError message={error}/>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </Form>
            </CardWrapper>
        )
    } 