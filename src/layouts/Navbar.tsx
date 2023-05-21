import brandImg from "../assets/imgs/brand.jpg"
import MenuMobile from "../components/menu/MenuMobile"
import ToggleTheme from "../components/toggleTheme/ToggleTheme"
import { FiLogIn } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"
import UserMenu from "../components/menu/UserMenu"
import { useAppSelector } from "../redux/Hooks"

const Navbar = () => {
    const user = useAppSelector(state => state.authState.currentUser)
    const location = useLocation()
    const pathname = location.pathname.split('/')[1]

    return (
        <nav className='navbar font-poppins'>
            <div className='relative mx-auto max-w-8xl z-50'>
                <div className="mx-4">
                    <div className='navbar-container'>
                        <Link to="/">
                            <img
                                src={brandImg}
                                alt="brand" className='rounded md:w-10 md:h-10 w-9 h-9 cursor-pointer'
                            />
                        </Link>
                        <ul className='wrap-items-navbar'>
                            <Link to="/blog">
                                <li className={`items-navbar ${pathname === 'blog' && 'items-navbar-selected '}`}>
                                    blog
                                </li>
                            </Link>
                            <Link to="/projects">
                                <li className={`items-navbar ${pathname === 'projects' && 'items-navbar-selected '}`}>
                                    project
                                </li>
                            </Link>
                            <Link to="/resume">
                                <li className={`items-navbar ${pathname === 'resume' && 'items-navbar-selected '}`}>
                                    resume
                                </li>
                            </Link>
                        </ul>
                        <div className='md:flex items-center gap-10 hidden'>
                            <ToggleTheme />
                            {
                                user ?
                                    <UserMenu /> :
                                    <Link to="/auth/login" >
                                        <div className='group flex items-center gap-4 cursor-pointer hover:text-sky-500'>
                                            sign up
                                            <div className='icon-auth-btn'>
                                                <FiLogIn size={18} />
                                            </div>
                                        </div>
                                    </Link>
                            }
                        </div>
                        <MenuMobile />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
