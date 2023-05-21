import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import bgLight from "../../assets/imgs/login-light-mode.jpg"
import bgDark from "../../assets/imgs/login-dark-mode.jpg"
import { useThemeContext } from "../../context/ThemeContext"
import { ThemeInterface } from "../../services/Interfaces"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from "../../layouts/SideNavbar"
import Loader from "../../components/loader/Loader"
import { useAppSelector } from "../../redux/Hooks"

const AuthPage = () => {
    const { theme } = useThemeContext() as ThemeInterface
    const loadingLogin = useAppSelector(state => state.authState.login.isFectching)
    const registerLogin = useAppSelector(state => state.authState.register.isFectching)

    const handleCheckTheme = () => {
        const condition =
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        if (condition) {
            return 'dark'
        } else {
            return 'light'
        }
    }
    const [appTheme, setAppTheme] = useState(handleCheckTheme)

    useEffect(() => {
        setAppTheme(handleCheckTheme)
    }, [theme])

    useEffect(() => {
        document.title = 'Đăng nhập vào Hoàng blog | Chia sẻ kiến thức.'
    }, [])

    return (
        <div
            className='relative flex justify-center items-center w-screen h-screen'
            style={{ backgroundImage: `url('${appTheme === 'light' ? bgLight : bgDark}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {loadingLogin || registerLogin ? <Loader /> : <SideNavbar />}
            <div className='w-full md:w-fit md:mx-auto text-center px-2 order-1'>
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                draggable={false}
                pauseOnHover={true}
            />
        </div>
    )
}

export default AuthPage
