"use client";

import { logout } from '@/actions/logout';
import { Button } from '@/components/ui/Button';    
import { useCurrentUser } from '@/hooks/use-curent-user';

const Settings = () => {
    const session = useCurrentUser();

    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <Button type="submit" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Settings;