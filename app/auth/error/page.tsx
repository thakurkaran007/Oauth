import { BackButton } from "@/components/auth/Backbutton"
import { CardWrapper } from "@/components/auth/cardWrapper"

const ErrorPage = () => {
    return <main >
        <CardWrapper
                headerLabel='Oops! Something went wrong'
                backButtonLabel='Back to login'
                backButtonHref='/auth/login'
                showSocial={false}
        >{''}
        </CardWrapper>
    </main>
}

export default ErrorPage;