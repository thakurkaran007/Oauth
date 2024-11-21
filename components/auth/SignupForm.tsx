"use client";

import * as z from "zod";
import { CardWrapper } from "./cardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { SignupSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/Button";
import { FormError } from "../form-error";
import Signup from "@/actions/Signup";
import { useState, useTransition } from "react";
import { FormSuccess } from "../Form-success";
import { sendMail } from "@/actions/sendMail";
import { VerifyMail } from "@/actions/VerifyMail";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const router = useRouter();
  const [oncode, setOncode] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    startTransition(() => {
      Signup(values).then((res) => {
        if ("error" in res) {
          setError(res.error);
        }
        if (res.success) {
          setSuccess(res.success);
          router.push("/auth/login");
        }
      });
    });
  };

  const handleSendMail = (values: z.infer<typeof SignupSchema>) => {
    console.log("Email verification sent");

    startTransition(() => {
      sendMail(values.email).then((res) => {
        if ("error" in res) {
          setError(res.error);
        } 
        if (res.success) {
            setOncode(true);
            setSuccess(res.success);
        }   
      });
    });
  };

  const handleVerify = (values: z.infer<typeof SignupSchema>) => {
    startTransition(() => {
      if (values.email && values.code) {
        VerifyMail(values.email, values.code).then((res) => {
          if ("error" in res) {
            setError(res.error);
          } 
          if (res.success) {
            setSuccess(res.success);
            setOncode(false);
            setShow(true);
          }
        });
      } else {
        setError("Email and code are required");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="kthakur7@gmail.com"
                        disabled={isPending || show}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {oncode && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="123456"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {show && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="alice pots"
                          disabled={isPending}
                        />
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
                        <Input
                          {...field}
                          type="password"
                          placeholder="******"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          {/* Group 1: Send and Verify Buttons */}
          {!show && (
            <div className="flex space-x-4">
              {!oncode && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleSendMail(form.getValues())}
                >
                  Send Mail
                </Button>
              )}
              {oncode && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleVerify(form.getValues())}
                >
                  Verify
                </Button>
              )}
            </div>
          )}
          {/* Group 2: Submit and Signup Buttons */}
          {show && (
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
