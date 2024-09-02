import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import Logout from './../molecules/auth/Logout';
import { Link } from 'react-router-dom';

const UserNav = () => {

    const checkingUser = localStorage.getItem("auth")
    console.log("user check", checkingUser)

    


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src='/avatars/01.png' alt='@shadcn' />
                        <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>Exam taking app</p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            satnaingdev@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {checkingUser ? <>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* changge password button */}
                    <DropdownMenuItem>
                        Change Passsword
                    </DropdownMenuItem>
                    {/* logout button */}
                    <DropdownMenuItem>
                        <Logout />
                    </DropdownMenuItem>
                </> : <DropdownMenuItem>
                        <Link to={"login"}>Login</Link>
                </DropdownMenuItem> }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav