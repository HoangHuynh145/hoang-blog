import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import composeBg from "../../assets/imgs/create-bg.jpg"
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { getWorkplaceById, getWorkplaces } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import { createWorkPlace, updateWorkplace } from '../../graphql-client/mutations'
import Loader from '../../components/loader/Loader'
import dateToString from '../../utils/FormatDate'

const FormWorkplace = () => {
    const workplaceNameRef = useRef<HTMLInputElement>(null)
    const dateStartRef = useRef<HTMLInputElement>(null)
    const dateEndRef = useRef<HTMLInputElement>(null)
    const notify = (message: string) => toast.error(message)
    const navigate = useNavigate()
    const location = useLocation()
    const isUpdating = location.pathname.split('/')[1] === 'update'
    const updateWorkplaceId = isUpdating && location.pathname.split('/')[3]
    const user = useAppSelector(state => state.authState.currentUser)
    const [createWorkspaceState, dataCreateMutation] = useMutation(createWorkPlace)
    const [updateWorkspaceState, dataUpdateMutation] = useMutation(updateWorkplace)
    const [workplaceInfo, setWorkplaceInfo] = useState({
        name: '',
        descWork: '',
        dateStart: '',
        dateEnd: ''
    })

    useQuery(getWorkplaceById, {
        variables: { workplaceId: updateWorkplaceId },
        skip: !updateWorkplaceId,
        context: {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        },
        onCompleted(data) {
            const workplaceObtained = data.workplace
            setWorkplaceInfo({
                name: workplaceObtained.name,
                descWork: workplaceObtained.descWork,
                dateStart: dateToString(workplaceObtained.dateStart, "MM/YYYY"),
                dateEnd: workplaceObtained.dateEnd
            })
        },
    })

    const handleMutation = (mutationFunc: any) => {
        mutationFunc({
            variables: {
                workplaceInf: {
                    ...workplaceInfo,
                    ...(isUpdating && { workplaceId: updateWorkplaceId })
                }
            },
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            },
            onCompleted: () => {
                navigate('/resume')
            },
            refetchQueries: [{ query: getWorkplaces }]
        })
    }

    const isValidDateFormat = (date: string) => {
        const regex = /^\d{2}\/\d{4}$/;
        return regex.test(date);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'nameRef':
                workplaceNameRef.current?.classList.remove('error')
                break;
            case 'dateStart':
                dateStartRef.current?.classList.remove('error')
                break;
            case 'dateEnd':
                dateEndRef.current?.classList.remove('error')
                break;
            default:
                break;
        }

        setWorkplaceInfo({
            ...workplaceInfo,
            [name]: value
        })
    }

    const handleCheck = (callback: () => void) => {
        if (workplaceInfo.name.trim() === '') {
            workplaceNameRef.current?.classList.add('error')
            notify('Nơi làm việc không được để trống')
        } else if (workplaceInfo.dateStart.trim() === '') {
            notify('Thời gian bắt đầu làm việc không được để trống')
        } else if (!isValidDateFormat(workplaceInfo.dateStart)) {
            dateStartRef.current?.classList.add('error')
            notify('Vui lòng điền đúng định dạng "MM/YYYY"')
        } else if (workplaceInfo.dateEnd.trim() === '') {
            dateEndRef.current?.classList.add('error')
            notify('Thời gian kết thúc làm việc không được để trống')
        } else if (workplaceInfo.dateEnd !== 'Tới nay' && !isValidDateFormat(workplaceInfo.dateEnd)) {
            dateEndRef.current?.classList.add('error')
            notify('Vui lòng điền đúng định dạng "MM/YYYY"')
        } else {
            handleMutation(callback)
        }
    }

    useEffect(() => {
        if (!user?.accessToken) {
            navigate('/auth/login')
        } else if (!user.isAdmin) {
            navigate("/")
        }
    }, [])

    if (dataCreateMutation.loading || dataUpdateMutation.loading) {
        return <Loader />
    }

    return (
        <div className='relative w-screen min-h-screen flex items-center'>
            <img src={composeBg} className='absolute w-full h-full object-cover object-center' />
            <div className='create-title-container'>
                <h2 className='text-center text-3xl font-medium py-16 w-80 mx-auto'>
                    {isUpdating ? 'Cập nhập' : 'Tạo'} nơi làm việc của bạn
                </h2>
                <div className='space-y-8 pb-5'>
                    {/* Workspace */}
                    <div>
                        <label htmlFor="workplace" className='mb-2 flex items-end gap-2 max-w-fit'>
                            Nhập nơi làm việc
                        </label>
                        <input
                            ref={workplaceNameRef}
                            value={workplaceInfo.name}
                            type="text"
                            id="workplace"
                            name="name"
                            className='input-create'
                            onChange={handleChangeInput}
                        />
                    </div>

                    {/* descWorkriptions */}
                    <div>
                        <label htmlFor="descWork" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập miêu tả nơi làm việc
                        </label>
                        <textarea
                            value={workplaceInfo.descWork}
                            id="descWork"
                            name="descWork"
                            className='border w-full p-2 bg-transparent outline-none max-h-20 min-h-[50px]'
                            onChange={(e) => setWorkplaceInfo({ ...workplaceInfo, descWork: e.target.value })}
                        />
                    </div>

                    {/* Date start */}
                    <div>
                        <label htmlFor="date-start" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập ngày bắt đầu làm việc
                        </label>
                        <input
                            ref={dateStartRef}
                            value={workplaceInfo.dateStart}
                            type='text'
                            name="dateStart"
                            id="date-start"
                            className='input-create'
                            onChange={handleChangeInput}
                        />
                    </div>

                    {/* Date end */}
                    <div>
                        <label htmlFor="date-end" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập ngày kết thúc làm việc
                        </label>
                        <input
                            ref={dateEndRef}
                            value={workplaceInfo.dateEnd}
                            type='text'
                            name="dateEnd"
                            id="date-end"
                            className='input-create'
                            onChange={handleChangeInput}
                        />
                    </div>
                    {
                        isUpdating ?
                            <button
                                className='step-create-blog-btn float-right'
                                onClick={() => handleCheck(updateWorkspaceState)}
                            >
                                Cập nhật
                            </button>
                            :
                            <button
                                className='step-create-blog-btn float-right'
                                onClick={() => handleCheck(createWorkspaceState)}
                            >
                                Hoàn thành
                            </button>
                    }
                </div>
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

export default FormWorkplace
