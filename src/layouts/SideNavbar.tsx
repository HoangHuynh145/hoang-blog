import brand from "../assets/imgs/brand.jpg"
import ToggleTheme from '../components/toggleTheme/ToggleTheme'
import { FaAngleLeft } from 'react-icons/fa'
import { useNavigate, Link } from "react-router-dom"

const SideNavbar = () => {
    const navigate = useNavigate()

    return (
        <div className='side-navbar-container'>
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
