"use client"
import { UserInfo } from "@/components/User-Info";
import { useCurrentUser } from "@/hooks/use-curent-user";

const Client = () => {
    const userInfo = useCurrentUser();
    return (
        <UserInfo user={userInfo} label="Client Info" />
    )
}

export default Client;