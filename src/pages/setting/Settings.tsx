import { useState } from 'react'
import ProfileSetting from '../../components/setting/ProfileSetting'
import Member from '../../components/setting/Member'
import SideNavbar from '../../layouts/SideNavbar'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import { useMutation } from '@apollo/client'
import { logout } from '../../graphql-client/mutations'
import { logoutFailure, logoutStart, logoutSuccess } from '../../redux/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import Footer from '../../layouts/Footer'

const Settings = () => {
    const [settingType, setSettingType] = useState('profile')
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector(state => state.authState.currentUser?.accessToken)
    const navigate = useNavigate()
    const [userLogout] = useMutation(logout)
    const [updateLoading, setUpdateLoading] = useState(false)


    const handleLogout = () => {
        dispatch(logoutStart())
        userLogout({
            context: {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            },
            onCompleted() {
                dispatch(logoutSuccess())
                navigate("/")
            },
            onError(err) {
                dispatch(logoutFailure())
                console.log(err)
            }
        })
    }
    
    return (
        <div className='art-bg min-h-screen'>
            {updateLoading && <Loader />}
            <SideNavbar />
            <div className='mx-auto px-4 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl pt-24 mb-20'>
                <div className='grid grid-flow-col-1 md:grid-cols-3 text-slate-800 dark:text-white'>
                    <ul className='flex justify-start items-center md:block gap-5 col-span-1 mb-5'>
                        <li
                            className={`menu-settings ${settingType === 'profile' && 'text-sky-500'}`}
                            onClick={() => setSettingType('profile')}
                        >
                            Profile
                        </li>
                        <li
                            className={`menu-settings ${settingType === 'membership' && 'text-sky-500'}`}
                            onClick={() => setSettingType('membership')}
                        >
                            Membership
                        </li>
                        <li className='menu-settings'></li>
                        <li
                            className='menu-settings flex-1 text-end md:flex-auto md:text-start'
                            onClick={handleLogout}
                        >
                            logout
                        </li>
                    </ul>

                    <div className='col-span-1 md:col-span-2'>
                        {settingType === 'profile' ? <ProfileSetting setLoading={setUpdateLoading} /> : <Member />}
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                draggable={false}
                pauseOnHover={true}
            />
        </div>
    )
}

export default Settings
