import { useQuery } from '@apollo/client'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { getPostDetail } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import Loader from '../loader/Loader'
import Navbar from '../../layouts/Navbar'
import ArticleRender from '../../utils/ArticleRender'
import { FaAngleLeft } from 'react-icons/fa'
import Footer from '../../layouts/Footer'
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Article = () => {
    const navigate = useNavigate()
    const accessToken = useAppSelector(state => state.authState.currentUser?.accessToken)
    const location = useLocation()
    const postId = location.state.postId

    const { loading, error, data } = useQuery(getPostDetail, {
        variables: { postId },
        context: {
            headers: {
                token: accessToken ? `Bearer ${accessToken}` : ''
            }
        }
    })

    const formatDateForArticle = (unixTime: string) => {
        const dateTime = new Date(Number(unixTime));
        const dayOfWeek = format(dateTime, 'EEEE', { locale: vi });
        const dayOfMonth = format(dateTime, 'dd', { locale: vi });
        const month = format(dateTime, 'MMMM', { locale: vi });
        const year = format(dateTime, 'yyyy', { locale: vi });
        const formattedDate = `${dayOfWeek}, ngày ${dayOfMonth} ${month}, ${year}`;
        return formattedDate
    }

    if (error) {
        console.log(error)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='art-bg-article'>
            <Navbar />
            <div className='mx-auto max-w-8xl pt-8 pb-10'>
                <div className='mx-4'>
                    <button
                        className='group text-sm flex items-center capitalize font-medium cursor-pointer text-white'
                        onClick={() => navigate(-1)}
                    >
                        <FaAngleLeft size={15} className='group-hover:-translate-x-1.5 transition-all duration-300' />
                        Trở lại
                    </button>
                </div>
            </div>
            <div className='text-white max-w-3xl mx-auto select-text relative pt-10'>
                <dl>
                    <dt className="sr-only">Date</dt>
                    <dd className="absolute top-0 inset-x-0 text-sm text-slate-700 dark:text-slate-400">
                        <time dateTime={new Date(Number(data?.post.createdAt)).toISOString()}>
                            {formatDateForArticle(data?.post.createdAt)}
                        </time>
                    </dd>
                </dl>
                <h1>{data?.post.title}</h1>
                <div className='mt-6'>
                    <div className='flex items-center gap-3'>
                        <img src={data?.post.author.avatar} className='w-9 h-9 rounded-full' />
                        <ul className='text-sm font-medium'>
                            <li>{data?.post.author.username}</li>
                            <Link to={`/${data?.post.author.userHashtag}`}>
                                <li className='text-sky-500'>{data?.post.author.userHashtag}</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <ArticleRender markdown={data?.post.contents} />
            </div>
            <Footer />
        </div >
    )
}

export default Article
