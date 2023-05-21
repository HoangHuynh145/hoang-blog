import { useState } from 'react'
import { IoWarning } from "react-icons/io5"
import { usePopupContext } from '../../context/PopupContext'
import { PopupContext } from '../../services/Interfaces'
import { useMutation } from '@apollo/client'
import { deleteArticle, deleteProject, deleteWorkplace } from "../../graphql-client/mutations"
import { useAppSelector } from '../../redux/Hooks'
import Loader from '../loader/Loader'
import { getProjects, getWorkplaces, getOwnPost, getAllPosts, getUserProfile } from '../../graphql-client/queries'

const DeletePopup = () => {
    const user = useAppSelector(state => state.authState.currentUser)
    const [shouldDelete, setShouldDelete] = useState(false)
    const { popupState, setPopupState } = usePopupContext() as PopupContext
    const [deleteArticleState] = useMutation(deleteArticle)
    const [deleteProjectState] = useMutation(deleteProject)
    const [deleteWorkplaceState] = useMutation(deleteWorkplace)
    const [deleteLoading, setDeleteLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === popupState.name) {
            setShouldDelete(true)
        } else {
            setShouldDelete(false)
        }
    }

    const handleClosePopup = () => {
        setPopupState({
            type: '',
            isOpen: false,
            id: '',
            name: '',
        })
    }

    const hanldeMutation = (deleteInfo: any, mutationFunc: any) => {
        setDeleteLoading(true)
        mutationFunc({
            variables: {
                ...deleteInfo,
                ...(popupState.type === 'bài viết') && { userId: user?.userId }
            },
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            },
            onCompleted: () => {
                handleClosePopup()
                setDeleteLoading(false)
            },
            onError: (error: Error) => {
                console.log(error)
                setDeleteLoading(false)
            },
            refetchQueries: [
                { query: getAllPosts },
                { query: getProjects },
                { query: getWorkplaces },
                {
                    query: getOwnPost,
                    variables: { userId: user?.userId }
                },
                {
                    query: getUserProfile,
                    variables: { userHashtag: user?.userHashtag }
                }
            ]
        })
    }

    const handleDelete = () => {
        switch (popupState.type) {
            case 'bài viết':
                hanldeMutation({ postId: popupState.id }, deleteArticleState)
                break;
            case 'dự án':
                hanldeMutation({ projectId: popupState.id }, deleteProjectState)
                break;
            case 'nơi làm việc':
                hanldeMutation({ workplaceId: popupState.id }, deleteWorkplaceState)
                break;
            default:
                break;
        }
    }

    if (deleteLoading) {
        return <Loader />
    }

    return (
        <div
            className='flex items-center justify-center w-screen h-screen fixed top-0 right-0 z-50 overflow-hidden'
            onClick={handleClosePopup}
        >
            <div
                className='w-[700px] bg-white rounded-xl p-8 text-sm relative animate-bottom-to-center'
                onClick={e => e.stopPropagation()}
            >
                <span
                    className='close-delete-popup'
                    onClick={handleClosePopup}
                >
                    &times;
                </span>
                <h3 className='text-2xl font-normal'>
                    Xoá {popupState.type}: {popupState.name}
                </h3>
                <hr className='w-full my-5 bg-slate-700' />
                <div className='box-alert'>
                    <IoWarning size={18} />
                    Hành động này sẽ xoá đi vĩnh viễn
                </div>
                <p className=' mb-4'>
                    <span className='font-semibold'>Sau khi xóa {popupState.type} này, bạn sẽ không thể truy cập nó trong tương lai.</span>
                    <br />
                    Bây giờ bạn đang hành động nghiêm túc. Hãy cẩn thận trước khi bạn xóa {popupState.type} này. Nó sẽ biến mất trong vũ trụ, mãi mãi.
                </p>
                <div className=''>
                    <span>Bạn có chắc chắn muốn xoá</span> <br />
                    <span>{popupState.name} ?</span> <br />
                    <span>Vui lòng nhập tên {popupState.type} để tiếp tục.</span>
                </div>
                <input
                    type="text"
                    className='w-full bg-slate-400/20 mt-2.5 p-3 rounded-lg border focus:border-slate-500'
                    placeholder={`Nhập tên ${popupState.type}`}
                    onChange={handleChange}
                />
                <hr className='w-full my-5 bg-slate-700' />
                <div className='flex items-center justify-center gap-2 float-right font-medium'>
                    <button className='btn-select' onClick={handleClosePopup} >Huỷ</button>
                    <button
                        className={`btn-select border-none opacity-50 cursor-not-allowed ${shouldDelete && 'pass'}`}
                        onClick={handleDelete}
                    >
                        Xoá
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup
