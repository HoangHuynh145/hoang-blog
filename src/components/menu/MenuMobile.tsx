import { useState } from "react"
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

    return (
        <>
            <span className='md:hidden' onClick={() => setisPanelOpen(true)} >
                <BsThreeDotsVertical size={24} />
            </span>
            {
                isPanelOpen && (
                    <div
                        onClick={() => setisPanelOpen(false)}
                        className='md:hidden fixed w-screen h-screen bg-black/20 right-0 top-0 backdrop-blur-sm'
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className='navbar-mobile'
                        >
                            <span
                                onClick={() => setisPanelOpen(false)}
                                className='absolute right-6'
                            >
                                <BsXLg size={16} strokeWidth={0.5} />
                            </span>
                            <ul className='capitalize font-semibold flex flex-col gap-4 text-lg'>
                                <Link to="/blog">
                                    <li>Blog</li>
                                </Link>
                                <Link to="/projects">
                                    <li>Project</li>
                                </Link>
                                <Link to="/resume">
                                    <li>Resume</li>
                                </Link>
                                <Link to={`/${user?.userHashtag}`}>
                                    <li>Trang cá nhân</li>
                                </Link>
                                <Link to="/me/articles">
                                    <li>Bài viết của tôi</li>
                                </Link>
                                <li>Bài viết đã lưu</li>
                                <Link to="/setting">
                                    <li>Cài đặt</li>
                                </Link>
                                {
                                    user ?
                                        <li onClick={handleLogout}>Đăng xuất</li>
                                        :
                                        <Link to="/auth/login">
                                            <li>Đăng nhập</li>
                                        </Link>
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
