import userAvt from "../../assets/imgs/userAvt.jpg"
import { userMenu } from "../../data/typeData"
import { FaAngleRight } from "react-icons/fa"
import { BiLockAlt } from "react-icons/bi"
import { MenuItems } from "../../services/Interfaces"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/Hooks"
import { FiLogOut } from "react-icons/fi"
import { useMutation } from "@apollo/client"
import { logout } from "../../graphql-client/mutations"
import {
    logoutStart,
    logoutSuccess,
    logoutFailure,
} from "../../redux/AuthSlice"

const UserMenu = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userAvtRef = useRef<HTMLDivElement>(null)
    const user = useAppSelector(state => state.authState.currentUser)
    const acessToken = user?.accessToken
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [userLogout] = useMutation(logout)


    const handleRedirect = () => {
        const userId = user?.userId
        navigate(`/${user?.userHashtag}`, { state: { userId } })
    }

    const handleRenderMenuItem = (item: MenuItems) => {
        const isAdmin = user?.isAdmin
        const shouldRenderLink = !item.justAdmin || isAdmin
        const linkTo = shouldRenderLink ? item.link : '#'
        const userAuthorizationClassName = (item.justAdmin && !isAdmin) ? 'user-authorization' : 'hidden'
        const lockOrArrow = !isAdmin && item.justAdmin ? <BiLockAlt /> : <FaAngleRight />

        return (
            <li
                key={item.id}
                onClick={() => setIsUserMenuOpen(false)}
            >
                {item.id === 2 && <hr className='w-full border-t-[0.15px] border-slate-600 my-2' />}
                <Link to={linkTo}>
                    <div className={`group user-menu-wrapper ${item.justAdmin || item.isDeveloping ? 'lock-item ' : ''}`}>
                        <span className={userAuthorizationClassName}>Chỉ phát triển dành cho admin</span>
                        {item.isDeveloping && <span className='user-authorization'>Tính năng đang phát triển</span>}
                        <span className='wrap-icon-menu'>
                            {<item.icon className=' text-slate-50 stroke-2' size={19} />}
                        </span>
                        <span className='font-medium normal-case flex-1'>{item.name}</span>
                        {item.arrow && lockOrArrow}
                    </div>
                </Link>
                {item.id === 2 && <hr className='w-full border-t-[0.15px] border-slate-600 my-2' />}
            </li>
        )
    }

    const handleLogout = () => {
        dispatch(logoutStart())
        userLogout({
            context: {
                headers: {
                    token: `Bearer ${acessToken}`
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

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (userAvtRef.current && !userAvtRef.current.contains(e.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }

        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
    }, [])


    return (
        <div className='relative cursor-pointer'>
            <div
                ref={userAvtRef}
                className='w-10 h-10 rounded-full flex items-center justify-center bg-slate-500 dark:bg-slate-50'
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
                <img src={user?.avatar} className='w-[37px] h-[37px] rounded-full' />
            </div>
            {
                isUserMenuOpen && (
                    <div className='absolute top-full mt-8 right-0'>
                        <div className='dropdown-container'>
                            <div
                                className='user-menu-wrapper'
                                onClick={handleRedirect}
                            >
                                <img src={user?.avatar} alt="" className='w-9 h-9 rounded-full' />
                                <div className='flex flex-col'>
                                    <span className='capitalize font-semibold'>{user?.username}</span>
                                    <span className='font-semibold text-sm text-slate-400/50 normal-case'>
                                        {user?.userHashtag}
                                    </span>
                                </div>
                            </div>

                            <hr className='w-full border-t-[0.15px] border-slate-600 my-2' />

                            <ul>
                                {userMenu.map(item => handleRenderMenuItem(item))}
                                <li onClick={handleLogout}>
                                    <div className='group user-menu-wrapper '>
                                        <span className='wrap-icon-menu'>
                                            <FiLogOut className=' text-slate-50 stroke-2' size={19} />
                                        </span>
                                        <span className='font-medium normal-case flex-1'>Đăng xuất</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default UserMenu
