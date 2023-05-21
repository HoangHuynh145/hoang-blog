import { useEffect } from 'react'
import Navbar from '../../layouts/Navbar'

const NotFound = () => {
    useEffect(() => {
        document.title = 'Trang này không tồn tại.'
    }, [])

    return (
        <div className='art-bg-article text-slate-800 dark:text-slate-200 min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex items-center justify-center flex-auto flex-col sm:flex-row'>
                <h1 className='border-r-none sm:border-r border-slate-300/10 sm:pr-6 sm:mr-6'>404</h1>
                <span className='text-lg text-slate-700 dark:text-slate-400'>Không tìm thấy nội dung.</span>
            </div>
        </div>
    )
}

export default NotFound
