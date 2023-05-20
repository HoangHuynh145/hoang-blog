import { useEffect } from 'react'
import { RiQuillPenLine } from "react-icons/ri"
import { VscTrash } from "react-icons/vsc"
import { AiOutlineRead } from "react-icons/ai"
import renderImgSrc from '../../utils/RenderSrc'
import { useLazyQuery } from '@apollo/client'
import { getPostById } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import { usePostContext } from '../../context/PostContext'
import { PopupContext, PostContextInterface, UserArticlesProps } from '../../services/Interfaces'
import { useNavigate } from 'react-router-dom'
import { usePopupContext } from '../../context/PopupContext'
import MarkdownRender from '../../utils/MarkdownRender'

const UserArticles = ({ postId, thumb, title, introContent, setLoadingArticle }: UserArticlesProps) => {
    const accessToken = useAppSelector(state => state.authState.currentUser?.accessToken)
    const navigate = useNavigate()
    const { setPopupState } = usePopupContext() as PopupContext
    const { setEditPost } = usePostContext() as PostContextInterface

    const [getPost, { loading }] = useLazyQuery(getPostById, {
        variables: { postId },
        context: {
            headers: {
                token: `Bearer ${accessToken}`
            }
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            const postObtained = data?.post
            setEditPost({
                postId: postObtained.postId,
                title: postObtained.title,
                types: postObtained.types,
                contents: postObtained.contents
            })
            navigate(`/update/article/${data.post.postId}/title`)
        }
    })

    const handleReadPost = () => {
        navigate(`/blog/${postId}`, { state: { postId } })
    }

    const handleShowPopup = () => {
        setPopupState({
            type: 'bài viết',
            isOpen: true,
            id: postId,
            name: title
        })
    }

    useEffect(() => {
        setLoadingArticle(loading)
    }, [loading])


    return (
        <li className='group user-article-container'>
            <div className='user-articles-thumb overflow-hidden max-w-none'>
                <img src={renderImgSrc(thumb)} className='w-full h-full object-cover object-center' />
            </div>
            <div className='flex-1'>
                <span className='font-medium md:text-base text-xl'>{title}</span>
                <div
                    className='md:text-sm text-lg mt-1 mb-3.5 text-slate-900/70 text-slate-800 dark:text-slate-200 line-clamp-4'
                    dangerouslySetInnerHTML={{ __html: MarkdownRender(introContent) }}
                />
            </div>
            <div className='user-article-options'>
                <span
                    className='cursor-pointer hover:opacity-75'
                    onClick={() => getPost()}
                >
                    <RiQuillPenLine size={28} />
                </span>
                |
                <span
                    className='cursor-pointer hover:opacity-75'
                    onClick={handleReadPost}
                >
                    <AiOutlineRead size={28} />
                </span>
                |
                <span
                    className='cursor-pointer hover:opacity-75'
                    onClick={handleShowPopup}
                >
                    <VscTrash size={28} />
                </span>
            </div>
        </li>
    )
}

export default UserArticles
