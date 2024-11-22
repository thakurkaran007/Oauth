"use client";

import * as z from 'zod';
import { settings } from '@/actions/settings';
import { Form, FormControl, FormLabel, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { SettingSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-curent-user';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/Form-success';

const Settings = () => {    
    const [success, setSuccess] = useState<string|undefined>('');
    const [error, setError] = useState<string|undefined>('');
    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();

    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
        }
    })

    const set = (values: z.infer<typeof SettingSchema>) => {
        startTransition(() => {
            settings(values)
            .then((res) => {
                if (res.error) {
                    setError(res.error);
                    setSuccess(undefined);
                }
                if (res.success) {
                    update();
                    setSuccess(res.success);
                    setError(undefined);
                }
            })
        })
    }

    return (
        <Card className='w-[600px]'>
            <CardHeader>
                <p className='text-2xl font-semibold text-center'>
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className='space-y-6' onSubmit={form.handleSubmit(set)}>
                        <div className='space-y-4'>
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={user?.name || 'Enter Name'}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            {
                                user?.isOAuth===false &&
                                <>
                                    <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder={user?.email || "Enter Email"}/>
                                            </FormControl>
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
                                                <Input {...field} disabled={isPending} placeholder='******'/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} placeholder="******"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                </>
                            }
                            <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} placeholder={user?.role}/>
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                        { !success && <FormError message={error} />}
                        { !error && <FormSuccess message={success} />}
                        <Button>
                            Update
                        </Button>
                    </form>
                    
                </Form>
            </CardContent>
        </Card>
    );
}

export default Settings;