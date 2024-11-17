import { CardWrapper } from "./cardWrapper"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel='Welcome back!'
            backButtonLabel='Don’t have an account?'
            backButtonHref='/auth/signup'
            >
            Login Form!
        </CardWrapper>
    )
} 