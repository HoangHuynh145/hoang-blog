import { Dispatch, useEffect } from 'react'
import { RiQuillPenLine } from 'react-icons/ri'
import { VscTrash } from 'react-icons/vsc'
import { PopupContext, Workplace } from '../../services/Interfaces'
import { useLazyQuery } from '@apollo/client'
import { getWorkplaceById } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import { useNavigate } from 'react-router-dom'
import { usePopupContext } from '../../context/PopupContext'
import dateToString from '../../utils/FormatDate'

const WorkplaceItem = (
    { workplace, setLoadingWorkplace }:
        { workplace: Workplace, setLoadingWorkplace: Dispatch<React.SetStateAction<boolean>> }
) => {
    const user = useAppSelector(state => state.authState.currentUser)
    const navigate = useNavigate()
    const { setPopupState } = usePopupContext() as PopupContext
    const [getWorkplace, { loading, error, data }] = useLazyQuery(getWorkplaceById, {
        variables: { workplaceId: workplace.workplaceId },
        context: {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            navigate(`/update/workplace/${data.workplace.workplaceId}`)
        }
    })

    const handleOpenPopup = () => {
        setPopupState({
            type: 'nơi làm việc',
            isOpen: true,
            id: workplace.workplaceId,
            name: workplace.name,
        })
    }

    useEffect(() => {
        setLoadingWorkplace(loading)
    }, [loading])

    return (
        <article className='group relative'>
            <div className='timeline-mask'></div>
            <svg viewBox="0 0 9 9" className='icon-line'>
                <circle cx="4.5" cy="4.5" r="4.5" stroke="currentColor" className='fill-slate-100 dark:fill-slate-900' strokeWidth="1.5"></circle>
            </svg>
            <dl className='absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]'>
                <dt className='sr-only' >Date</dt>
                <dd className='whitespace-nowrap text-sm leading-6 text-slate-500 dark:text-slate-400'>
                    <time dateTime={new Date(Number(workplace.dateStart)).toISOString()}>
                        {dateToString(workplace.dateStart, "MM/YYYY")}
                    </time>
                    <span> - </span>
                    <span>{workplace.dateEnd}</span>
                </dd>
            </dl>
            <div className='cursor-pointer'>
                <div className='relative text-slate-900 dark:text-slate-200 cursor-pointer'>
                    <h3 className='timeline-title'>{workplace.name}</h3>
                    <p className='timeline-intro'>{workplace.descWork}</p>
                </div>
            </div>
            {
                user?.isAdmin && (
                    <div className='relative flex gap-4 items-center text-slate-700 dark:text-white mt-2'>
                        <span
                            className='cursor-pointer hover:opacity-75'
                            onClick={() => getWorkplace()}
                        >
                            <RiQuillPenLine size={20} />
                        </span>
                        |
                        <span
                            className='cursor-pointer hover:opacity-75'
                            onClick={handleOpenPopup}
                        >
                            <VscTrash size={20} />
                        </span>
                    </div>
                )
            }
        </article>
    )
}

export default WorkplaceItem
