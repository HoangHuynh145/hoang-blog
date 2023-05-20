import { FaAngleRight } from "react-icons/fa"
import { PostDocument } from "../../services/Interfaces"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import MarkdownRender from "../../utils/MarkdownRender"

const ArticleItem = ({ postInfo }: { postInfo: PostDocument }) => {
    const navigate = useNavigate()

    const formatDate = (date: Date) => {
        // MMMM DD, YYYY
        const timestamp = new Date(+date)
        const newDate = moment(timestamp).format('DD-MM-YYYY')
        return newDate
    }

    const handleClick = () => {
        navigate(`/blog/${postInfo.slug}`, { state: { postId: postInfo.postId } })
    }

    return (
        <article
            className='group relative'
            onClick={handleClick}
        >
            <div className='timeline-mask'></div>
            <svg viewBox="0 0 9 9" className='icon-line'>
                <circle cx="4.5" cy="4.5" r="4.5" stroke="currentColor" className='fill-slate-100 dark:fill-slate-900' strokeWidth="1.5"></circle>
            </svg>
            <dl className='absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]'>
                <dt className='sr-only' >Date</dt>
                <dd className='whitespace-nowrap text-sm leading-6 text-slate-500 dark:text-slate-400' >
                    <time dateTime='2022-12-15T15:00:00.000Z'>{formatDate(postInfo.createdAt)}</time>
                </dd>
            </dl>
            <div className='cursor-pointer'>
                <div className='relative text-slate-900 dark:text-slate-200 cursor-pointer'>
                    <h3 className='timeline-title'>
                        {postInfo.title}
                    </h3>
                    <div
                        className='timeline-intro'
                        dangerouslySetInnerHTML={{ __html: MarkdownRender(postInfo.introContent) }}
                    />
                </div>
                <div className='relative text-sky-500 flex items-center gap-1 cursor-pointer'>
                    <p>Read more</p>
                    <FaAngleRight size={14} />
                </div>
            </div>
        </article>
    )
}

export default ArticleItem
