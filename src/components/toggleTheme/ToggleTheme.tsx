import { useEffect, useRef, useState } from 'react'
import { useThemeContext } from "../../context/ThemeContext"
import { ThemeInterface } from "../../services/Interfaces"
import { BsMoonStars, BsSun } from "react-icons/bs"
import { HiComputerDesktop } from "react-icons/hi2"

const themeData = [
    {
        id: 0,
        theme: 'light',
        icon: <BsSun size={18} strokeWidth={0.5} />
    },
    {
        id: 1,
        theme: 'dark',
        icon: <BsMoonStars size={18} strokeWidth={0.5} />
    },
    {
        id: 2,
        theme: 'system',
        icon: <HiComputerDesktop size={18} strokeWidth={0.5} />
    },
]

const ToggleTheme = () => {
    const [isDropdownOpen, setisDropdownOpen] = useState(false)
    const { theme, setTheme } = useThemeContext() as ThemeInterface
    const dropDownRef = useRef<HTMLDivElement>(null)

    const renderIconByTheme = () => {
        switch (theme) {
            case 'light':
                return (
                    <BsSun size={24} />
                )
            case 'dark':
                return (
                    <BsMoonStars size={24} />
                )
            case 'system':
                return (
                    <HiComputerDesktop size={24} />
                )
            default:
                break;
        }
    }

    const handleClickDropdownItems = (theme: string) => {
        setTheme(theme)
        setisDropdownOpen(false)
    }

    const handleClick = (e: MouseEvent) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
            setisDropdownOpen(false)
        }
    }

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            if (theme === 'light' || theme === 'dark') {
                localStorage.setItem('theme', theme)
            } else {
                localStorage.removeItem('theme')
            }
        }
    }, [theme])

    useEffect(() => {
        window.addEventListener('mousedown', handleClick)
        return () => window.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <div
            ref={dropDownRef}
            className='capitalize relative'
        >
            <div
                className='cursor-pointer text-sky-600'
                onClick={() => setisDropdownOpen(!isDropdownOpen)}
            >
                {renderIconByTheme()}
            </div>

            <ul
                className={`dropdown-menu ${isDropdownOpen ? 'block' : 'hidden'}`}
            >
                {themeData.map(data => (
                    <li
                        key={data.id}
                        className={`icon-mode ${theme === data.theme && 'text-sky-500'} `}
                        onClick={() => handleClickDropdownItems(data.theme)}
                    >
                        <span className='w-6 h-6 flex items-center justify-center'>
                            {data.icon}
                        </span>
                        {data.theme}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToggleTheme
