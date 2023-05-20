import { Dispatch, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import { useMutation } from '@apollo/client'
import { updateUser } from '../../graphql-client/mutations'
import { toast } from 'react-toastify'
import { updateCurrentUser } from "../../redux/AuthSlice"
import { useNavigate } from 'react-router-dom'

const ProfileSetting = ({ setLoading }: { setLoading: Dispatch<React.SetStateAction<boolean>> }) => {
    const user = useAppSelector(state => state.authState.currentUser)
    const notifyError = (message: string) => toast.error(message);
    const notifySuccess = (message: string) => toast.success(message);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [fieldError, setFieldError] = useState('')
    const [updateState, dataMutation] = useMutation(updateUser)


    const [userInfo, setUserInfo] = useState({
        username: user ? user?.username : '',
        email: user ? user?.email : '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFieldError('')
        setUserInfo({
            ...userInfo,
            [name]: value,
        })
    }

    const handleUpdate = (
        e: React.MouseEvent<HTMLButtonElement>,
        updatedInfo: any
    ) => {
        e.preventDefault()
        updateState({
            variables: {
                updatedInfo: { ...updatedInfo },
                ...(updatedInfo.password && { currentPassword: userInfo.password }),
                userId: user?.userId
            },
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken} `
                }
            },
            onCompleted: (data) => {
                const response = data.updateUser
                if (response.state === 'error') {
                    notifyError(response.message)
                    setFieldError(response.field)
                } else {
                    notifySuccess('Cập nhập thành công')
                    if (!updatedInfo.password) {
                        dispatch(updateCurrentUser(updatedInfo))
                    } else {
                        setUserInfo({
                            ...userInfo,
                            password: '',
                            newPassword: '',
                            confirmPassword: '',
                        })
                    }
                }
            },
            onError: (err: Error) => {
                console.log(err)
                notifyError(err.message)
            }
        })
    }

    const updatePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!userInfo.password || userInfo.password.trim() === '') {
            notifyError("Trường mật khẩu đang bị trống hoặc chỉ chứa ký tự khoảng trắng.")
            setFieldError('password')
        } else if (userInfo.newPassword.trim() === '') {
            notifyError("Không thể đặt giá trị trống hoặc khoảng trắng làm mật khẩu.")
            setFieldError('newPassword')
        } else if (userInfo.newPassword !== userInfo.confirmPassword) {
            notifyError("Mật khẩu không trùng khớp")
            setFieldError('confirmPassword')
        } else {
            handleUpdate(e, { password: userInfo.newPassword })
        }
    }

    useEffect(() => {
        if (!user?.accessToken) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        setLoading(dataMutation.loading)
    }, [dataMutation.loading])


    return (
        <form action="">
            <h4 className='text-xl font-bold mb-5'>My Information</h4>

            <div className='space-y-12'>
                {/* Name */}
                <div>
                    <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold'>Name</h4>
                        <button
                            className='btn-update-setting'
                            onClick={(e) => handleUpdate(e, { username: userInfo.username })}
                        >
                            update name
                        </button>
                    </div>
                    <div className={`input-container ${fieldError === 'username' ? 'error' : ''}`} >
                        <label htmlFor="name" className='label-input-setting'>user name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className='w-full px-3.5 pt-4 h-16'
                            value={userInfo.username}
                            onChange={handleChangeInfo}
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold'>Email Address</h4>
                        <button
                            className='btn-update-setting'
                            onClick={(e) => handleUpdate(e, { email: userInfo.email })}
                        >
                            update email
                        </button>
                    </div>
                    <div className={`input-container ${fieldError === 'email' ? 'error' : ''}`}>
                        <label htmlFor="email" className='label-input-setting'>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className='w-full px-3.5 pt-4 h-16'
                            value={userInfo.email}
                            onChange={handleChangeInfo}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className='space-y-2'>
                    <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-semibold'>Change Password</h4>
                        <button
                            className='btn-update-setting'
                            onClick={updatePassword}
                        >
                            update password
                        </button>
                    </div>

                    <div className={`input-container ${fieldError === 'password' ? 'error' : ''}`} >
                        <label htmlFor="current-password" className='label-input-setting'>Current Password</label>
                        <input
                            type="password"
                            id="current-password"
                            name="password"
                            className='w-full px-3.5 pt-4 h-16'
                            onChange={handleChangeInfo}
                            value={userInfo.password}
                        />
                    </div>

                    {/* New Password */}
                    <div className={`input-container ${fieldError === 'newPassword' ? 'error' : ''}`}>
                        <label htmlFor="new-password" className='label-input-setting'>New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            name="newPassword"
                            className='w-full px-3.5 pt-4 h-16'
                            value={userInfo.newPassword}
                            onChange={handleChangeInfo}
                        />
                    </div>

                    {/* Confirm password */}
                    <div className={`input-container ${fieldError === 'confirmPassword' ? 'error' : ''}`}>
                        <label htmlFor="confirm-password" className='label-input-setting'>Confirm</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            className='w-full px-3.5 pt-4 h-16'
                            value={userInfo.confirmPassword}
                            onChange={handleChangeInfo}
                        />
                    </div>
                </div>
            </div>
        </form >
    )
}

export default ProfileSetting
