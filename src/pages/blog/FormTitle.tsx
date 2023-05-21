import { useRef, ChangeEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import composeBg from "../../assets/imgs/create-bg.jpg"
import { usePostContext } from '../../context/PostContext'
import { PostContextInterface } from '../../services/Interfaces'
import { typeColor, typeData } from '../../data/typeData'
import { ToastContainer, toast } from 'react-toastify'
import { useAppSelector } from '../../redux/Hooks'

const FormTitle = () => {
    const inputTitleRef = useRef<HTMLInputElement>(null)
    const typesContainerRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const navigate = useNavigate()
    const shouldResetArticle = location.state ? location.state.isComback : undefined
    const isUpdating = location.pathname.split('/')[1] === 'update'
    const notify = (message: string) => toast.error(message);
    const user = useAppSelector(state => state.authState.currentUser)

    const { editPost, setEditPost } = usePostContext() as PostContextInterface

    const handleDeleteType = (typeName: string) => {
        setEditPost({
            ...editPost,
            types: editPost.types.filter(type => type !== typeName)
        })
    }

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        inputTitleRef.current?.classList.remove('border-red-500')
        setEditPost((prevPost) => ({ ...prevPost, title: e.target.value }))
    }

    const handleChangeType = (e: ChangeEvent<HTMLInputElement>) => {
        typesContainerRef.current?.classList.remove('border-red-500')
        const typeIndex = editPost.types.indexOf(e.target.value)
        if (typeIndex === -1) {
            setEditPost({
                ...editPost,
                types: [...editPost.types, e.target.value]
            })
        } else {
            handleDeleteType(e.target.value)
        }
    }

    const handleBeforeRedirectToContent = () => {
        if (editPost.title.trim().length == 0) {
            inputTitleRef.current?.classList.add('border-red-500')
            notify('Vui lòng điền thông tin cho trường tiêu đề')
            return false
        } else if (editPost.types.length === 0) {
            typesContainerRef.current?.classList.add('border-red-500')
            notify('Vui lòng chọn thể loại cho bài viết')
            return false
        } else {
            if (isUpdating) {
                navigate(`/update/article/${editPost.postId}/content`)
            } else {
                navigate('/create/article/content')
            }
        }
    }

    useEffect(() => {
        if (!user?.accessToken) {
            navigate('/auth/login')
        } else if (!user?.isAdmin) {
            navigate("/")
        } else if (!isUpdating && !shouldResetArticle) {
            setEditPost({
                title: '',
                types: [] as string[],
                contents: ''
            })
        }
    }, [])

    useEffect(() => {
        document.title = `${editPost.title}.`
    }, [editPost.title])

    return (
        <div className='relative w-screen min-h-screen flex items-center'>
            <img src={composeBg} className='absolute w-full h-full object-cover object-center' />
            <div className='create-title-container'>
                <h2 className='text-center text-3xl font-medium py-16'>
                    {isUpdating ? 'Update' : 'Create'} your article title
                </h2>
                <div className='space-y-8 pb-5'>
                    <div>
                        <label htmlFor="title" className='relative mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập tiêu đề cho bài viết của bạn
                        </label>
                        <input
                            ref={inputTitleRef}
                            type="text"
                            id="title"
                            className='border w-full p-2'
                            value={editPost.title}
                            onChange={handleChangeTitle}
                        />
                    </div>

                    <div className='border-t border-slate-100/80 py-6'>
                        <div className='max-w-fit flex items-center gap-2'>
                            <span className='text-lg'>Thể loại</span>
                        </div>

                        <ul className='grid grid-cols-4 gap-2 mt-2'>
                            {typeData.map(typeInfo => (
                                <li
                                    key={typeInfo.id}
                                    className='flex items-center gap-2'
                                >
                                    <input
                                        type="checkbox"
                                        className='w-4 h-4 accent-sky-600'
                                        checked={editPost.types.find(type => type === typeInfo.name) ? true : false}
                                        value={typeInfo.name}
                                        onChange={handleChangeType}
                                    />
                                    <span className='capitalize '>{typeInfo.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div
                        ref={typesContainerRef}
                        className='w-full p-3 border rounded-lg flex flex-wrap gap-4 min-h-[70px] '
                    >
                        {
                            editPost.types.map((type, index) => (
                                <div className={`type-box ${typeColor[type]}`} key={index}>
                                    <span
                                        className='absolute top-px right-2 cursor-pointer'
                                        onClick={() => handleDeleteType(type)}
                                    >
                                        &times;
                                    </span>
                                    <span className='capitalize'>{type}</span>
                                </div>
                            ))
                        }
                    </div>

                </div>

                <div className='w-full flex items-center justify-between'>
                    <button
                        className='step-create-blog-btn float-right'
                        onClick={() => navigate("/")}
                    >
                        trang chủ
                    </button>

                    <button
                        className='step-create-blog-btn float-right'
                        onClick={handleBeforeRedirectToContent}
                    >
                        {isUpdating ? 'Chỉnh sửa' : 'Tạo'} nội dung
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                draggable={false}
                pauseOnHover={true}
            />
        </div>
    )
}

export default FormTitle
