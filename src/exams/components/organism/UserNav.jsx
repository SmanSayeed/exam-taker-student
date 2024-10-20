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

import { useSelector } from 'react-redux';
import Logout from './../molecules/auth/Logout';

const UserNav = () => {
    const auth = useSelector(state => state.auth);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src='/avatars/01.png' alt='@shadcn' />
                        <AvatarFallback>
                            {
                                auth?.student?.profile_image ? (
                                    <img src={auth?.student?.profile_image} alt="user image" />
                                ) : (
                                    <span>{auth?.student?.name.charAt(0)}</span>
                                )
                            }
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>Exam taking app</p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            {auth?.student?.email}
                        </p>
                        {
                            auth?.student?.profile_image ? (
                                <img src={auth?.student?.profile_image} alt="user image" />
                            ) : (
                                <span>{auth?.student?.name.charAt(0)}</span>
                            )
                        }
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Logout />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav