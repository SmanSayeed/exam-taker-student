import { AlignJustify, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';
import { Layout } from '../../../templates/Layout';
import Nav from '../../../templates/Nav';
import Logo from '../../atoms/Logo';
import ThemeSwitch from '../../atoms/ThemeSwitch';
import UserNav from '../../organism/UserNav';
import { NavLinks } from './NavLinks';

export default function Navbar({ className, isCollapsed, setIsCollapsed }) {

    const checkingUser = localStorage.getItem("auth")
    const navigate = useNavigate()

    const handleNavigating = () => {
        navigate("/login")
    }

    const [navOpened, setNavOpened] = useState(false);
    /* Make body not scrollable when navBar is opened */
    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [navOpened]);



    return (
        <nav className='flex items-center justify-between   '>

            {/* Overlay in mobile */}
            <div
                onClick={() => setNavOpened(false)}
                className={`absolute top-10 inset-0 transition-[opacity] delay-100 duration-700 z-50 ${navOpened ? 'h-svh opacity-100' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
            >
                <Nav
                    id='sidebar-menu'
                    className={`z-40 h-full md:hidden flex flex-row  overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen'}`}
                    closeNav={() => setNavOpened(false)}
                    isCollapsed={isCollapsed}
                    links={NavLinks}
                />
            </div>


            <Layout fixed className={` ${navOpened ? 'h-svh' : ''} w-full flex flex-co items-center justify-between md:flex-row `}>
                <Layout.Header
                    sticky
                    className='z-50 w-full flex justify-between shadow-sm py-3 px-3 md:px-6  '
                >
                    <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
                        <Logo />
                    </div>

                    <Nav
                        id='sidebar-menu'
                        className={`z-40 h-full hidden md:flex flex-row  overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen'}`}
                        closeNav={() => setNavOpened(false)}
                        isCollapsed={isCollapsed}
                        links={NavLinks}
                    />


                    <div className='hidden md:flex items-center gap-3'>
                        <ThemeSwitch />
                        {
                            checkingUser ? <UserNav /> : <Button onClick={handleNavigating} >Login</Button>
                        }
                    </div>


                    <div className='flex items-center md:hidden '>
                        <div>
                            <ThemeSwitch />
                        </div>

                        {/* Toggle Button in mobile */}
                        <Button
                            variant='ghost'
                            size='icon'

                            aria-label='Toggle Navigation'
                            aria-controls='sidebar-menu'
                            aria-expanded={navOpened}
                            onClick={() => setNavOpened((prev) => !prev)}
                        >
                            {navOpened ? <X /> : <AlignJustify />}
                        </Button>
                    </div>
                </Layout.Header>

            </Layout>
        </nav>
    )
}