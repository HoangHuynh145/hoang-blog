import { useEffect, useState } from 'react'
import ArticleItem from "../../components/article/ArticleItem"
import CopyRight from "../../components/policy/CopyRight"
import Footer from "../../layouts/Footer"
import Navbar from "../../layouts/Navbar"
import { Link, useLocation } from "react-router-dom"
import { typeData } from "../../data/typeData"
import { useLazyQuery } from '@apollo/client'
import { getAllPosts, getPostByType } from '../../graphql-client/queries'
import Loader from '../../components/loader/Loader'
import { PostDocument } from '../../services/Interfaces'

const Blogs = () => {
    const [listArticles, setListArticles] = useState([])

    const [
        getPosts,
        {
            loading: allPostLoading,
        }
    ] = useLazyQuery(getAllPosts)

    const [
        getPostsByType,
        {
            loading: typePostLoading,
        }
    ] = useLazyQuery(getPostByType)

    const location = useLocation()
    const pathName = location.pathname.split('/')[2]

    const renderPosts = () => {
        return listArticles?.map((post: PostDocument) => (
            <div
                key={post.postId}
                className='border-b pb-6 border-b-slate-800/20 dark:border-b-slate-200/20 md:pb-0 md:border-b-0 last:border-b-0'
            >
                <ArticleItem postInfo={post} />
            </div>
        ))
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (pathName) {
            document.title = `Danh sách bài viết loại ${pathName}.`
            getPostsByType({
                variables: { type: pathName },
                onCompleted(data) {
                    setListArticles(data.postsByType)
                }
            })
        } else {
            document.title = 'Danh sách bài viết.'
            getPosts({
                onCompleted(data) {
                    setListArticles(data.posts)
                },
            })
        }
    }, [location.pathname])

    useEffect(() => {
        
    }, [])

    if (typePostLoading || allPostLoading) {
        return <Loader />
    }

    return (
        <div className='art-bg-article'>
            <Navbar />
            <div className='max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl'>
                <div className='py-16 px-4'>
                    <div className='py-10 text-left sm:text-center text-slate-900 dark:text-slate-200' >
                        {pathName ?
                            <h2 className='mb-4 font-bold'>Chuyên mục #{pathName} | Hoàng Huỳnh Blog</h2>
                            :
                            <h2 className='mb-4 font-bold'>Hoàng Huỳnh Blog</h2>
                        }

                        <span className='text-lg'>Không có gì ngoài các bài viết chất lượng, chuyên sâu.</span>
                    </div>
                    <div>
                        <ul className='flex gap-2 justify-start sm:justify-center items-center flex-wrap' >
                            <li
                                className='group categories'
                            >
                                <Link className='cate-items' to="/blog" >all</Link>
                            </li>
                            {typeData.map(item => (
                                <li
                                    className='group categories'
                                    key={item.id}
                                >
                                    <Link className='cate-items' to={`/${item.tagName}`} >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {
                    (!listArticles.length) ?
                        <h2 className='text-center text-white mx-auto'>Hiện tại chưa có bài viết nào.</h2> :
                        <div
                            className='timeline-content'
                        >
                            <span className='line'></span>
                            <div className='space-y-6 md:space-y-16'>
                                {renderPosts()}
                            </div>
                        </div>
                }

            </div>
            <Footer />
            <CopyRight />
        </div>
    )
}

export default Blogs

