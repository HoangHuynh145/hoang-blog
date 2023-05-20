import renderImgSrc from '../../utils/RenderSrc'
import { OwnPost } from '../../services/Interfaces'
import { useNavigate } from 'react-router-dom'

const ProfileArticle = ({ ownPosts }: { ownPosts: [OwnPost] }) => {
    const navigate = useNavigate()

    return (
        <ul className='own-articles-container'>
            {ownPosts.map((post: OwnPost, index: number) => (
                <li
                    key={index}
                    onClick={() => navigate(`/blog/${post.slug}`, { state: { postId: post.postId } })}
                >
                    <div className='user-articles'>
                        <div className='user-articles-thumb'>
                            <img src={renderImgSrc(post.thumbnail)} className='w-full h-full object-cover object-center' />
                        </div>
                        <div className='sm:col-span-1 flex-1 text-start text-slate-800 dark:text-slate-200'>
                            <span className='font-medium'>{post.title}</span>
                            <p className='text-sm mt-1 mb-3.5 text-slate-900/70 text-slate-800 dark:text-slate-200 line-clamp-4'>
                                {post.introContent}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ProfileArticle
