import { UserInfo } from "@/components/User-Info";
import { currentUser } from "@/lib/currentUser";

const Server = async () => {
    const userInfo = await currentUser();
    return (
        <UserInfo user={userInfo} label="User Info" />
    )
}

export default Server;