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
    import { useSearchParams } from "next/navigation";
    import Link from "next/link";

    export const LoginForm = () => {
        const [showCode, setShowCode] = useState(false);
        const urlError = useSearchParams().get("error") === "OAuthAccountNotLinked" ? "Email is already in use" : '';
        const [error, setError] = useState<string | undefined>();
        const [success, setSuccess] = useState<string | undefined>();
        const [isPending, startTransition] = useTransition();

        const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: '',
                password: '',
                code: ''
            }
        });

        const onSubmit = (values: z.infer<typeof LoginSchema>) => {
            startTransition(() => {

                Login(values).then((data) => {
                    if (data.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                    if (data.twoFactor) {
                        setShowCode(true);
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
                        {
                            showCode && 
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder='Enter Code' disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        }
                        { !showCode &&
                        <>
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
                                <Button 
                                    variant='link'
                                    size='sm'
                                    asChild
                                    className="px-0 font-normal"
                                >
                                    <Link href="/auth/reset">Forgot password?</Link>
                                </Button>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </>
                        }
                        </div>
                        {success && <FormSuccess message={success}/>}
                        {error && <FormError message={error || urlError}/>}
                        <Button type="submit" className="w-full">{showCode ? "Verify" : "Login"}</Button>
                    </form>
                </Form>
            </CardWrapper>
        )
    } 