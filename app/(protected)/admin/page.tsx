"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/Form-success";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const ApiRouteClick = () => [
        fetch("/api/admin")
            .then((res) => {
                if (res.ok) {
                    toast.success("API Auth Allowed")
                } else {
                    toast.error("Forbidden API Route!")
                }
            })
    ]
    const ServerActionClick = () => {
        admin()
            .then((res) => {
                if (res.success) {
                    toast.success("Server Action Allowed")
                }
                if (res.error) {
                    toast.error("Forbidden Server Action!")
                }
            })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold textcenter">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You'r allowed to see content"/>
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p>Admin-Only API Route</p>
                    <Button onClick={ApiRouteClick}>Click to Test</Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2 shadow-sm">
                    <p>Admin-Only Server Action</p>
                    <Button onClick={ServerActionClick}>Click to Test</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage;