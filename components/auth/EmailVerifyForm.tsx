"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./cardWrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "../Form-success"
import { FormError } from "../form-error"

export const EmailVerifyForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const token = useSearchParams().get("token");

    const Submit = useCallback(() => {
        if (error || success) return;

        if (!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token)
            .then((data) => {
                if ("error" in data) {
                    setError(data.error);
                } else {
                    setSuccess(data.success);
                }
            })
            .catch((error) => {
                setError(error.message);
            })
    }, [token, error, success])

    useEffect(() => {
        Submit();
    }, [success, Submit])

    return (
        <CardWrapper 
            headerLabel="Confirmation of Email "
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <div className="flex justify-center items-center">
                { !error && !success && <BeatLoader />}
                { success && <FormSuccess message={success} />}
                { error && <FormError message={error} />}
            </div>
        </CardWrapper>
    )
}