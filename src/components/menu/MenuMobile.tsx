import { useEffect, useState } from "react"
import { BsMoonStars, BsSun, BsThreeDotsVertical, BsXLg } from "react-icons/bs"
import { HiComputerDesktop } from "react-icons/hi2"
import { FaAngleDown } from "react-icons/fa"
import { useThemeContext } from "../../context/ThemeContext"
import { ThemeInterface } from "../../services/Interfaces"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/Hooks"
import {
    logoutStart,
    logoutSuccess,
    logoutFailure,
} from "../../redux/AuthSlice"
import { useMutation } from "@apollo/client"
import { logout } from "../../graphql-client/mutations"
import { mobileMenu } from "../../data/typeData"

const MenuMobile = () => {
    const { theme, setTheme } = useThemeContext() as ThemeInterface
    const [isPanelOpen, setisPanelOpen] = useState(false)
    const user = useAppSelector(state => state.authState.currentUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userLogout] = useMutation(logout)

    const renderIconByTheme = (iconSize: number, iconStroke?: number) => {
        switch (theme) {
            case 'light':
                return (
                    iconStroke ? <BsSun size={iconSize} strokeWidth={iconStroke} /> : <BsSun size={iconSize} />
                )
            case 'dark':
                return (
                    iconStroke ? <BsMoonStars size={iconSize} strokeWidth={iconStroke} /> : <BsMoonStars size={iconSize} />
                )
            case 'system':
                return (
                    iconStroke ? <HiComputerDesktop size={iconSize} strokeWidth={iconStroke} /> : <HiComputerDesktop size={iconSize} />
                )
            default:
                break;
        }
    }

    const handleLogout = () => {
        document.documentElement.classList.remove('overflow-hidden')
        dispatch(logoutStart())
        userLogout({
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            },
            onCompleted() {
                dispatch(logoutSuccess())
                navigate("/")
            },
            onError(err) {
                dispatch(logoutFailure())
                console.log(err)
            }
        })
    }

    const handleLogin = () => {
        document.documentElement.classList.remove('overflow-hidden')
        navigate("/auth/login")
    }

    const handleOpenModal = () => {
        document.documentElement.classList.add('overflow-hidden')
        setisPanelOpen(true)
    }

    const handleCloseModal = () => {
        document.documentElement.classList.remove('overflow-hidden')
        setisPanelOpen(false)
    }

    const handleClick = (link: string) => {
        handleCloseModal()
        navigate(link)
    }

    const renderMenuItems = () => (
        mobileMenu.map(item => (
            <li
                key={item.id}
                onClick={() => handleClick(item.link)}
            >
                {item.name}
            </li>
        ))
    )


    return (
        <>
            <span className='md:hidden' onClick={handleOpenModal} >
                <BsThreeDotsVertical size={24} />
            </span>
            {
                isPanelOpen && (
                    <div
                        onClick={handleCloseModal}
                        className='md:hidden fixed z-[99] inset-0 w-screen h-screen'
                    >
                        <div className='absolute inset-0 bg-black/20 backdrop-blur-lg backdrop-filter' />
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='navbar-mobile'
                        >
                            <span
                                onClick={handleCloseModal}
                                className='absolute right-6'
                            >
                                <BsXLg size={16} strokeWidth={0.5} />
                            </span>
                            <ul className='capitalize font-semibold flex flex-col gap-4 text-lg'>
                                {
                                    user?.accessToken && (
                                        <li
                                            onClick={() => handleClick(`/${user?.userHashtag}`)}
                                        >
                                            Trang cá nhân
                                        </li>
                                    )
                                }
                                {
                                    user?.isAdmin && (
                                        <li
                                            onClick={() => handleClick(`/create/article/title`)}
                                        >
                                            Tạo bài viết
                                        </li>
                                    )
                                }
                                {renderMenuItems()}
                                {
                                    user ?
                                        <li onClick={handleLogout}>Đăng xuất</li> :
                                        <li onClick={handleLogin}>Đăng nhập</li>
                                }
                            </ul>
                            <div className='switch-container'>
                                <span>Switch theme</span>
                                <div className='select-wrapper'>
                                    <span className='w-6 h-6 flex items-center justify-center text-slate-400'>
                                        {renderIconByTheme(16, 0.5)}
                                    </span>
                                    <span className='capitalize font-medium'>{theme}</span>
                                    <span className='w-6 h-6 flex items-center justify-center text-slate-400'>
                                        <FaAngleDown size={16} strokeWidth={0.5} />
                                    </span>
                                    <select
                                        onChange={(e) => setTheme(e.target.value)}
                                        className='select-theme'
                                        value={theme}
                                    >
                                        <option value="light">light</option>
                                        <option value="dark">dark</option>
                                        <option value="system">system</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MenuMobile
