import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiLockAlt } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { toast } from 'react-toastify';
import { useMutation } from "@apollo/client"
import { userLogin } from "../../graphql-client/mutations"
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import {
    loginStart,
    loginSuccess,
    loginFailure
} from "../../redux/AuthSlice"

const Login = () => {
    const userEmail = useAppSelector(state => state.authState.emailUser)
    const emailRef = useRef<HTMLDivElement>(null)
    const passwordRef = useRef<HTMLDivElement>(null)
    const notify = (message: string) => toast.error(message);
    const [shouldLogin, setShouldLogin] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: userEmail ? userEmail : '',
        password: ''
    })
    const [loginUserState, dataMutation] = useMutation(userLogin)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!loginInfo.email || !regex.test(loginInfo.email)) {
            notify('Email trống hoặc sai định dạng!')
            emailRef.current?.classList.add('box-error')
        } else if (!loginInfo.password) {
            notify('Mật khẩu đang bị trống!')
            passwordRef.current?.classList.add('box-error')
        } else {
            dispatch(loginStart())
            setShouldLogin(true)

        }
    }

    const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, email: e.target.value })
        emailRef.current?.classList.remove('box-error')
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, password: e.target.value })
        passwordRef.current?.classList.remove('box-error')
    }

    useEffect(() => {
        if (shouldLogin) {
            loginUserState({
                variables: {
                    email: loginInfo.email,
                    password: loginInfo.password
                },
                onCompleted(data) {
                    setShouldLogin(false)
                    dispatch(loginSuccess(data.userLogin))
                    navigate("/")
                },
                onError(error) {
                    notify(error.message)
                    dispatch(loginFailure())
                }
            })
        }
    }, [shouldLogin])

    return (
        <div className='form-box'>
            <div className='w-full md:w-[300px] text-slate-700 dark:text-slate-200 z-20'>
                <h2 className='font-semibold'>Login</h2>
                <form action="" className='mt-10 mb-3 w-full'>
                    <div className='space-y-12'>
                        <div
                            ref={emailRef}
                            className='input-box'
                        >
                            <input
                                type='text'
                                value={loginInfo.email}
                                id='email'
                                required
                                className='input-auth'
                                onChange={e => handleChangeInputEmail(e)}
                            />
                            <label htmlFor="email" className='input-label'>Email</label>
                            <HiOutlineMail size={18} />
                        </div>

                        <div
                            ref={passwordRef}
                            className='input-box'
                        >
                            <input
                                value={loginInfo.password}
                                type='password'
                                id='password'
                                required
                                className='input-auth'
                                onChange={e => handleChangePassword(e)}
                            />
                            <label htmlFor="password" className='input-label'>Password</label>
                            <BiLockAlt size={18} />
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-1 w-full capitalize mt-5'>
                        <input type="checkbox" id="remember" className='w-[14px] h-[14px]' />
                        <label htmlFor="remember" className='text-sm'>remember me forget password</label>
                    </div>

                    <button type="submit" className='btn-auth' onClick={handleSubmit}>Log in</button>
                </form>

                <span className='mt-3 text-sm'>
                    Don't you have a account?&#160;
                    <Link to="/auth/register">
                        <span className='hover:underline'>Register</span>
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Login
