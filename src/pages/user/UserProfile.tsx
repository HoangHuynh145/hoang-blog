import { HiUsers } from 'react-icons/hi2'
import background from "../../assets/imgs/df_bg.png"
import Footer from '../../layouts/Footer'
import SideNavbar from '../../layouts/SideNavbar'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getUserProfile } from '../../graphql-client/queries'
import { useState } from 'react'
import Loader from '../../components/loader/Loader'
import { Profile } from '../../services/Interfaces'
import NotFound from '../error/NotFound'
import ProfileArticle from '../../components/article/ProfileArticle'

const UserProfile = () => {
    const location = useLocation()
    const userHashtag = location.pathname.split('/')[1]
    const [profile, setProfile] = useState<Profile | undefined>()
    const { loading, data } = useQuery(getUserProfile, {
        variables: { userHashtag },
        skip: !userHashtag,
        onCompleted(data) {
            setProfile(data.profile)
        },
        onError(error) {
            console.log(error)
        },
    });

    if (loading) {
        return <Loader />
    }

    if (!data.profile) {
        console.log(data)
        return <NotFound />
    }

    return (
        <div className='art-bg-article text-slate-800 dark:text-slate-200'>
            <SideNavbar />
            <div className='max-w-[52rem] mx-auto px-0 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl'>
                <div className='relative'>
                    <img src={background} className='rounded-b-2xl' />
                    <div className='user-info'>
                        <div className='avt-warpper'>
                            <img src={profile?.avatar} className='rounded-full w-full h-full' />
                        </div>
                        <span className='md:self-end pb-3 text-2xl md:text-3xl font-bold text-center capitalize'>{profile?.username}</span>
                    </div>
                </div>
                <div className='xl:flex md:mt-28 mt-40 px-6 gap-4'>
                    <ul className='w-full xl:w-5/12 space-y-5 '>
                        <li className='profile-box'>
                            <p className='font-semibold mb-2'>Giới thiệu</p>
                            <div className='text-sm flex items-center gap-2'>
                                <HiUsers size={18} />
                                <span>
                                    Thành viên của Hoàng blog - Chia sẻ kiến thức
                                </span>
                            </div>
                        </li>

                        <li className='profile-box'>
                            <p className='font-semibold mb-2'>Hoạt động gần đây</p>
                            <p className='text-sm flex items-center gap-2'>
                                Chưa có hoạt động gần đây
                            </p>
                        </li>
                    </ul>
                    <div className='w-full xl:w-7/12 col-span-2 profile-box px-2 mt-5 md:mt-0 '>
                        <p className='font-semibold mb-2 px-4'>Các bài viết đã đăng: </p>
                        <div>
                            {
                                profile?.ownPosts.length ?
                                    <ProfileArticle ownPosts={profile.ownPosts} /> :
                                    <span>Không có bài biết nào</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile
