import { auth } from '@/auth'

const settings = async () => {
    const session = await auth();
    return (
        <div>
            <h1>{JSON.stringify(session)}</h1>
        </div>
    );
}

export default settings;