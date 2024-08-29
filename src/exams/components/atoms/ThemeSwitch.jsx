import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { MoonStar, Sun } from "lucide-react"
import { useEffect } from "react";

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    /* Update theme-color meta tag
     * when theme is updated */
    useEffect(() => {
        const themeColor = theme === 'dark' ? '#020817' : '#fff'
        const metaThemeColor = document.querySelector("meta[name='theme-color']")
        metaThemeColor && metaThemeColor.setAttribute('content', themeColor)
    }, [theme])

    return (
        <Button
            size='icon'
            variant='ghost'
            className='rounded-full'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? 
            // <IconMoon size={20} /> 
                <MoonStar size={20} /> :
                <Sun size={20} />
                // <IconSun size={20} />
            }
        </Button>
    )
}

export default ThemeSwitch;