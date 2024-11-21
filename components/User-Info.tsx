import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge"
interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <Card>
            <CardHeader className="w-[600px] shadow-md ">
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="mt-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.id}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p className="text-sm font-medium">Name</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.name}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.email}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p className="text-sm font-medium">Role</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{user?.role}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p className="text-sm font-medium">Two Factor Authoristaion</p>
                    <Badge variant={user?.isTwoFactor ? "success" : "destructive"}>{user?.isTwoFactor ? "ON" : "OFF"}</Badge>
                </div>
            </CardContent>
        </Card>
    )
}