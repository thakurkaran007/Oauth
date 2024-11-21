import { EmailVerifyForm } from "@/components/auth/EmailVerifyForm";
import { Suspense } from "react";

const VerificationPage = () => {
    return (
        
        <Suspense fallback={<div>Loading...</div>}>
            <EmailVerifyForm />
        </Suspense>
    )
}

export default VerificationPage;