import { Link } from 'react-router-dom'
import { TotalInfoProps } from '../../services/Interfaces'

const MainView = ({ getTotalInfo }: { getTotalInfo: TotalInfoProps }) => {

    return (
        <section className='mt-20'>
            <div className='grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full pb-20 gap-10'>
                <div className='col-span-1'>
                    <ul className='uppercase space-y-4'>
                        <li className='abilities'>bloger</li>
                        <li className='abilities'>student</li>
                        <li className='abilities'>frontend developer</li>
                    </ul>
                </div>
                <Link to="/resume">
                    <div className='col-span-1 text-slate-full dark:text-slate-50'>
                        <div className='card bg-sky-500 before:bg-sky-500'>
                            <p className='text-2xl font-semibold'>year experience</p>
                            <span className='text-5xl font-semibold'>
                                {getTotalInfo?.TotalWorkplaces}
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/blog">
                    <div className='col-span-1 text-slate-full dark:text-slate-50'>
                        <div className='card bg-indigo-500 before:bg-indigo-500'>
                            <p className='text-2xl font-semibold'>blogs</p>
                            <span className='text-5xl font-semibold'>
                                {getTotalInfo?.TotalArticles}
                            </span>
                        </div>
                    </div>
                </Link>
                <Link to="/projects">
                    <div className='col-span-1 text-slate-full dark:text-slate-50'>
                        <div className='card bg-teal-500 before:bg-teal-500'>
                            <p className='text-2xl font-semibold'>successful projects</p>
                            <span className='text-5xl font-semibold'>
                                {getTotalInfo?.TotalProjects}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default MainView
