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
                <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
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
                    <div className="flex items-center gap-4">
                        <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
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
                        <div className="flex flex-col gap-2">
                            <p className='leading-none text-muted-foreground'>
                                {auth?.student?.name}
                            </p>
                            <p className='text-sm leading-none text-muted-foreground'>
                                {auth?.student?.email}
                            </p>
                        </div>
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