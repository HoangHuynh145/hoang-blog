import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { BiLockAlt, BiUser } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { BsShieldLock } from "react-icons/bs"
import { toast } from 'react-toastify';
import {
    registerStart,
    registerSuccess,
    registerFailure
} from "../../redux/AuthSlice"
import { useAppDispatch } from '../../redux/Hooks'
import { useMutation, useLazyQuery } from '@apollo/client'
import { findUserByEmail, findUserByName } from "../../graphql-client/queries"
import { ClipLoader } from 'react-spinners'
import { userRegister } from "../../graphql-client/mutations"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const emailRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLDivElement>(null)
    const PassRef = useRef<HTMLDivElement>(null)
    const confirmPassRef = useRef<HTMLDivElement>(null)
    const notify = (message: string) => toast.error(message);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [getUserByEmail, dataUserByEmail] = useLazyQuery(findUserByEmail, {
        onCompleted(data) {
            if (data.findUserByEmail) {
                notify('Email đã tồn tại!')
                emailRef.current?.classList.add('box-error')
            }
        },
    })
    const [getUserByName, dataUserByName] = useLazyQuery(findUserByName, {
        onCompleted(data) {
            if (data.findUserByName) {
                notify('Tên đã tồn tại!')
                nameRef.current?.classList.add('box-error')
            }
        }
    })
    const [registerUserInfo] = useMutation(userRegister, {
        onCompleted(data) {
            dispatch(registerSuccess(data.createUser.email))
            navigate("/auth/login")
        },
        onError(error) {
            notify(error.message)
            dispatch(registerFailure())
        }
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'username':
                nameRef.current?.classList.remove('box-error')
                break;
            case 'email':
                emailRef.current?.classList.remove('box-error')
                break;
            case 'password':
                PassRef.current?.classList.remove('box-error')
                break;
            case 'confirmPassword':
                confirmPassRef.current?.classList.remove('box-error')
                break;
            default:
                break;
        }

        setRegisterInfo({
            ...registerInfo,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!registerInfo.username) {
            notify('Tên người dùng đang bị trống!')
            nameRef.current?.classList.add('box-error')
        } else if (!regex.test(registerInfo.email)) {
            notify('Email trống hoặc sai định dạng!')
            emailRef.current?.classList.add('box-error')
        } else if (!registerInfo.password || registerInfo.password.trim()) {
            notify('Trường mật khẩu đang bị để trống!')
            PassRef.current?.classList.add('box-error')
        } else if (registerInfo.password !== registerInfo.confirmPassword) {
            notify('Mật khẩu không khớp!')
            confirmPassRef.current?.classList.add('box-error')
        } else {
            dispatch(registerStart())
            const createUserInput = {
                username: registerInfo.username.trim(),
                email: registerInfo.email.trim(),
                password: registerInfo.password,
                avatar: 'https://res.cloudinary.com/dsziocv6v/image/upload/v1682309140/df_avt_rizmyi.jpg'
            }
            registerUserInfo({
                variables: { newUser: createUserInput }
            })
        }
    }

    const handleBlurEmail = () => {
        dataUserByEmail.refetch()
        getUserByEmail({ variables: { email: registerInfo.email } })
    }

    const handleBlurName = () => {
        dataUserByName.refetch()
        getUserByName({ variables: { username: registerInfo.username } })
    }

    useEffect(() => {
        document.title = 'Đăng ký tài khoản Hoàng blog | Chia sẻ kiến thức.'
    }, [])

    return (
        <div className='form-box'>
            <div className='w-[310px] text-slate-700 dark:text-slate-200'>
                <h2 className='font-semibold'>Register</h2>
                <form action="" className='mt-10 mb-3'>
                    <div className='space-y-12'>
                        <div
                            ref={nameRef}
                            className='input-box'
                        >
                            <input
                                type='text'
                                name='username'
                                id='name'
                                required
                                className='input-auth'
                                onChange={handleChangeInput}
                                onBlur={handleBlurName}
                                value={registerInfo.username}
                            />
                            <label htmlFor="name" className='input-label'>Name</label>
                            {dataUserByName.loading ? <ClipLoader size={18} color="rgb(226, 232, 240)" /> : <BiUser size={18} />}
                        </div>

                        <div
                            ref={emailRef}
                            className='input-box'
                        >
                            <input
                                type='text'
                                id='email'
                                name='email'
                                required
                                className='input-auth'
                                onChange={handleChangeInput}
                                value={registerInfo.email}
                                onBlur={handleBlurEmail}
                            />
                            <label htmlFor="email" className='input-label'>Email</label>
                            {dataUserByEmail.loading ? <ClipLoader size={18} color="rgb(226, 232, 240)" /> : <HiOutlineMail size={18} />}

                        </div>

                        <div
                            ref={PassRef}
                            className='input-box'
                        >
                            <input
                                type='password'
                                id='password'
                                name='password'
                                required
                                className='input-auth'
                                onChange={handleChangeInput}
                                value={registerInfo.password}
                            />
                            <label htmlFor="password" className='input-label'>Password</label>
                            <BiLockAlt size={18} />
                        </div>

                        <div
                            ref={confirmPassRef}
                            className='input-box'
                        >
                            <input
                                type='password'
                                id='confirm'
                                name='confirmPassword'
                                required
                                className='input-auth'
                                onChange={handleChangeInput}
                                value={registerInfo.confirmPassword}
                            />
                            <label htmlFor="confirm" className='input-label'>Confirm password</label>
                            <BsShieldLock size={18} />
                        </div>
                    </div>

                    <button type="submit" className='btn-auth' onClick={handleSubmit}>Register</button>
                </form>

                <span className='mt-3 text-sm'>
                    Do you already have an account?&#160;
                    <Link to="/auth/login">
                        <span className='hover:underline'>Login</span>
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Register
