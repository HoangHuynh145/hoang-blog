import brand from "../assets/imgs/brand.jpg"
import ToggleTheme from '../components/toggleTheme/ToggleTheme'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate, Link } from "react-router-dom"

const SideNavbar = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full fixed top-0 flex justify-between items-center gap-2 z-40 md:px-7 h-16 dark:text-slate-200 text-slate-700 bg-white/50 dark:bg-slate-800/50'>
            <div className='flex items-center'>
                <Link to="/">
                    <img src={brand} className='rounded w-9 h-9 cursor-pointer hidden md:block' />
                </Link>
                <button
                    className='group  text-sm ml-4 flex items-center uppercase font-medium cursor-pointer'
                    onClick={() => navigate(-1)}
                >
                    <FaAngleLeft size={15} className='group-hover:-translate-x-1.5 transition-all duration-300' />
                    Quay lại
                </button>
            </div>

            <div className='mr-20'>
                <ToggleTheme />
            </div>
        </div>
    )
}

export default SideNavbar
