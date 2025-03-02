"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-curent-user"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { LogoutButton } from "../logout-button"
import { ExitIcon } from "@radix-ui/react-icons"

export const UserButton = () => {
    const user = useCurrentUser();
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ''}/>
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white"/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="w-5 h-5 mr-2"/>
                        <LogoutButton>Logout</LogoutButton> 
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}