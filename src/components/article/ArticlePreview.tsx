import { usePostContext } from '../../context/PostContext'
import { PostContextInterface } from '../../services/Interfaces'
import ArticleRender from '../../utils/ArticleRender'
import Navbar from '../../layouts/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { createPost, updatePost } from '../../graphql-client/mutations'
import { useAppSelector } from '../../redux/Hooks'
import { useEffect } from 'react'
import Loader from '../loader/Loader'
import { getAllPosts, getOwnPost } from '../../graphql-client/queries'

const ArticlePreview = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state
    const isUpdating = state ? state.isUpdating : undefined
    const user = useAppSelector(state => state.authState.currentUser)
    const { editPost, setEditPost } = usePostContext() as PostContextInterface

    const [createArticle, dataCreateMutation] = useMutation(createPost)
    const [updateArticle, dataUpdateMutation] = useMutation(updatePost)

    const handleMutation = (funcMutation: any) => {
        const postId = editPost.postId
        funcMutation({
            variables: {
                ...(isUpdating && { postId: postId }),
                userId: user?.userId,
                postInfo: editPost
            },
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            },
            refetchQueries: [{ query: getAllPosts }, {
                query: getOwnPost,
                variables: { userId: user?.userId }
            }],
            onCompleted: () => {
                setEditPost({
                    title: '',
                    types: [],
                    contents: ''
                })
                navigate('/blog')
            }
        })
    }


    const handleCombackContent = () => {
        if (isUpdating) {
            navigate(`/update/article/${editPost.postId}/content`)
        } else {
            navigate("/create/article/content")
        }
    }

    const handleReturnBtnSubmit = () => {
        if (isUpdating) {
            return (
                <button
                    className='step-create-blog-btn'
                    onClick={() => handleMutation(updateArticle)}
                >
                    Cập nhật
                </button>
            )
        } else {
            return (
                <button
                    className='step-create-blog-btn'
                    onClick={() => handleMutation(createArticle)}
                >
                    Xuất bản
                </button>
            )
        }
    }

    useEffect(() => {
        if (!user?.accessToken) {
            navigate('/auth/login')
        } else if (!editPost.contents) {
            handleCombackContent()
        }
    }, [])

    if (dataCreateMutation.loading || dataUpdateMutation.loading) {
        return <Loader />
    }

    return (
        <div className='art-bg-article'>
            <Navbar />
            <div className='text-white max-w-3xl mx-auto select-text px-8'>
                <ArticleRender markdown={editPost.contents} />
                <div className='flex justify-between items-center border-t border-slate-400 py-5'>
                    <button
                        className='step-create-blog-btn'
                        onClick={handleCombackContent}
                    >
                        Quay lại
                    </button>

                    {handleReturnBtnSubmit()}
                </div>
            </div>
        </div >
    )
}

export default ArticlePreview
