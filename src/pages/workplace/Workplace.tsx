import { useEffect, useState } from 'react'
import Navbar from '../../layouts/Navbar'
import WorkplaceItem from '../../components/workplace/WorkplaceItem'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getWorkplaces } from '../../graphql-client/queries'
import Loader from '../../components/loader/Loader'
import { PopupContext, Workplace } from '../../services/Interfaces'
import { useAppSelector } from '../../redux/Hooks'
import { usePopupContext } from '../../context/PopupContext'
import DeletePopup from '../../components/popup/DeletePopup'

const Workplace = () => {
    const [loadingWorkplace, setLoadingWorkplace] = useState(false)
    const navigate = useNavigate()
    const isAdmin = useAppSelector(state => state.authState.currentUser?.isAdmin)
    const { popupState } = usePopupContext() as PopupContext
    const { loading, error, data } = useQuery(getWorkplaces)

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Danh sách nơi làm việc.'
    }, [])

    return (
        <div className='art-bg-article'>
            <Navbar />
            {popupState.isOpen && <DeletePopup />}
            {(loading || loadingWorkplace) && <Loader />}
            <div className='py-16 px-4 flex justify-center items-center flex-col text-slate-900 dark:text-slate-200'>
                <h2 className='mb-4 font-bold'>Hoàng Huỳnh Experience</h2>
                <p className='text-lg mb-3'>Những nơi mà mình đã hoạt động.</p>
                {
                    isAdmin && (
                        <button
                            className='py-2.5 px-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg hover:opacity-90 self-center text-white'
                            onClick={() => navigate("/create/workplace")}
                        >
                            Tạo thêm nơi làm việc
                        </button>
                    )
                }
            </div>
            <div className='timeline-container'>
                <div className='timeline-content'>
                    <span className='line'></span>
                    <div className='space-y-6 md:space-y-16'>
                        {data?.workplaces.length > 0 && data?.workplaces.map((item: Workplace) => (
                            <div
                                key={item.workplaceId}
                                className='border-b pb-6 border-b-slate-800/20 dark:border-b-slate-200/20 md:pb-0 md:border-b-0 last:border-b-0'
                            >
                                <WorkplaceItem workplace={item} setLoadingWorkplace={setLoadingWorkplace} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workplace
