import { useEffect } from 'react'
import { useAppSelector } from '../../redux/Hooks'
import { useNavigate } from 'react-router-dom'

const Member = () => {
    const user = useAppSelector(state => state.authState.currentUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user?.accessToken) {
            navigate("/")
        }
        document.title = 'Thông tin thành viên.'
    }, [])

    return (
        <>
            <h4 className='font-semibold mb-5'>Quản lý tư cách thành viên</h4>
            <div className='input-container p-5 justify-between text-sm capitalize'>
                <div className='font-semibold'>
                    <div className='flex items-center gap-1 normal-case'>
                        <span>Tư cách thành viên</span>
                        <span className='text-[9.5px] leading-none px-1 py-0.5 font-semibold border border-green-500/50 rounded-sm'>
                            active
                        </span>
                    </div>
                    <h4 className='uppercase mt-2'>{user?.isAdmin ? 'Quản trị viên' : 'người dùng'}</h4>
                </div>
            </div>
        </>
    )
}

export default Member
