import SideNavbar from '../../layouts/SideNavbar'
import { useEffect, useState } from 'react'
import UserArticles from '../../components/article/UserArticles'
import { useQuery } from '@apollo/client'
import { getOwnPost } from '../../graphql-client/queries'
import Loader from '../../components/loader/Loader'
import { PopupContext, PostDocument } from '../../services/Interfaces'
import { useAppSelector } from '../../redux/Hooks'
import DeletePopup from '../../components/popup/DeletePopup'
import { usePopupContext } from '../../context/PopupContext'

const OwnBlog = () => {
    const [loadingArticle, setLoadingArticle] = useState(false)
    const { popupState } = usePopupContext() as PopupContext
    const user = useAppSelector(state => state.authState.currentUser)
    const { loading, data } = useQuery(getOwnPost, {
        variables: { userId: user?.userId }
    })

    useEffect(() => {
        document.title = 'Bài viết của tôi.'
    }, [])


    return (
        <div className='art-bg-article'>
            {popupState.isOpen && <DeletePopup />}
            {(loading || loadingArticle) && <Loader />}
            <SideNavbar />
            <div className='max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl'>
                <div className='pt-20 text-slate-900 dark:text-slate-200'>
                    <div className='py-10 text-center'>
                        <h2>My Articles</h2>
                    </div>
                    <ul className='max-w-3xl mx-auto mt-16 md:space-y-14'>
                        {data?.user.ownPosts.length > 0 ? data?.user.ownPosts.map((post: PostDocument) =>
                            <UserArticles
                                postId={post.postId}
                                thumb={post.thumbnail}
                                title={post.title}
                                introContent={post.introContent}
                                setLoadingArticle={setLoadingArticle}
                                key={post.postId}
                            />
                        ) : <h2 className='text-center'>Hiện tại bạn chưa có bài viết nào</h2>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OwnBlog