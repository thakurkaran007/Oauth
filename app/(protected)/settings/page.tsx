import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/Button';

const settings = async () => {
    const session = await auth();
    return (
        <div>
            <h1>{JSON.stringify(session)}</h1>
            <form action={async() => {
                "use server"
                await signOut();
                Response.redirect("/auth/login");
            }}>
                <Button type="submit">Logout</Button>
            </form>
        </div>
    );
}

export default settings;