import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import composeBg from "../../assets/imgs/create-bg.jpg"
import { useMutation, useQuery } from '@apollo/client'
import { getProjectById, getProjects } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import { createProject, updateProject } from "../../graphql-client/mutations"
import Loader from '../../components/loader/Loader'
import dateToString from '../../utils/FormatDate'

const FormProject = () => {
    const nameProjectRef = useRef<HTMLInputElement>(null)
    const dateDeployRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const location = useLocation()
    const navigate = useNavigate()
    const isUpdating = location.pathname.split('/')[1] === 'update'
    const updateProjectId = isUpdating && location.pathname.split('/')[3]
    const notify = (message: string) => toast.error(message)
    const [techInput, setTechInput] = useState('')
    const user = useAppSelector(state => state.authState.currentUser)

    const [createProjectState, dataCreateMutation] = useMutation(createProject)
    const [updateProjectState, dataUpdateMutation] = useMutation(updateProject)

    const [projectInfo, setProjectInfo] = useState({
        name: '',
        desc: '',
        technologies: [] as string[],
        link: '',
        dateDeploy: ''
    })

    useQuery(getProjectById, {
        variables: { projectId: updateProjectId },
        skip: !updateProjectId,
        context: {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        },
        onCompleted(data) {
            const projectObtained = data.project
            setProjectInfo({
                name: projectObtained.name,
                desc: projectObtained.desc,
                technologies: projectObtained.technologies,
                link: projectObtained.link,
                dateDeploy: dateToString(projectObtained.dateDeploy, "DD-MM-YYYY")
            })
            setTechInput(projectObtained.technologies.join(',') || " ")
        },
    })

    const handleMutation = (mutaionFunction: any) => {
        mutaionFunction({
            variables: {
                projectInf: {
                    ...projectInfo,
                    technologies: techInput.split(',').map(tech => tech.trim()),
                    ...(updateProjectId && { projectId: updateProjectId })
                }
            },
            context: {
                headers: {
                    token: `Bearer ${user?.accessToken}`
                }
            },
            onCompleted: () => {
                navigate("/projects")
            },
            refetchQueries: [{ query: getProjects }]
        })
    }

    const isValidDateFormat = () => {
        const regex = /^\d{2}\-\d{2}\-\d{4}$/;
        return regex.test(projectInfo.dateDeploy);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case 'name':
                nameProjectRef.current?.classList.remove('error')
                break;
            case 'dateDeploy':
                dateDeployRef.current?.classList.remove('error')
                break;
            case 'link':
                linkRef.current?.classList.remove('error')
                break;
            default:
                break;
        }

        setProjectInfo({
            ...projectInfo,
            [name]: value
        })
    }

    const handleCheck = (callback: () => void) => {
        if (projectInfo.name.trim() === '') {
            nameProjectRef.current?.classList.add('error')
            notify('Tên dự án đang bị trống')
        } else if (projectInfo.link.trim() === '') {
            linkRef.current?.classList.add('error')
            notify('Đường dẫn của dự án đang bị trống')
        } else if (!isValidDateFormat()) {
            dateDeployRef.current?.classList.add('error')
            notify('Vui lòng điền đúng định dạng "DD-MM-YYYY"')
        } else {
            handleMutation(callback)
        }
    }

    useEffect(() => {
        if (!user?.accessToken) {
            navigate('/auth/login')
        } else if (!user?.isAdmin) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        document.title = `Dự án: ${projectInfo.name}.`
    }, [projectInfo.name])



    if (dataCreateMutation.loading || dataUpdateMutation.loading) {
        return <Loader />
    }

    return (
        <div className='relative w-screen min-h-screen flex items-center'>
            <img src={composeBg} className='absolute w-full h-full object-cover object-center' />
            <div className='create-title-container'>
                <h2 className='text-center text-3xl font-medium py-16 w-80 mx-auto'>
                    {isUpdating ? 'Cập nhập' : 'Tạo'} dự án của bạn
                </h2>
                <div className='space-y-8 pb-5'>
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className='mb-2 flex items-end gap-2 max-w-fit'>
                            Nhập tên dự án
                        </label>
                        <input
                            ref={nameProjectRef}
                            type="text"
                            id="title"
                            name="name"
                            className='input-create'
                            value={projectInfo.name}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="title" className='mb-2 flex items-end gap-2 max-w-fit'>
                            Nhập ngày triển khai
                        </label>
                        <input
                            ref={dateDeployRef}
                            type="text"
                            id="title"
                            name="dateDeploy"
                            className='input-create'
                            value={projectInfo.dateDeploy}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label htmlFor="desc" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập miêu tả dự án
                        </label>
                        <textarea
                            id="desc"
                            name="desc"
                            className='border w-full p-2 bg-transparent outline-none max-h-20 min-h-[50px]'
                            value={projectInfo.desc}
                            onChange={(e) => setProjectInfo({ ...projectInfo, desc: e.target.value })}
                        />
                    </div>

                    {/* Technologies */}
                    <div>
                        <label htmlFor="tech" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập công nghệ chính của dự án
                        </label>
                        <input
                            type='text'
                            id="tech"
                            className='border w-full p-2'
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label htmlFor="title" className='mb-2 flex items-center gap-2 max-w-fit'>
                            Nhập đường dẫn của dự án
                        </label>
                        <input
                            ref={linkRef}
                            type='url'
                            id="title"
                            name="link"
                            required
                            className='border w-full p-2'
                            value={projectInfo.link}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {
                        isUpdating ?
                            <button
                                className='step-create-blog-btn float-right'
                                onClick={() => handleCheck(updateProjectState)}
                            >
                                Cập nhật
                            </button> :
                            <button
                                className='step-create-blog-btn float-right'
                                onClick={() => handleCheck(createProjectState)}
                            >
                                Hoàn thành
                            </button>
                    }
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                draggable={false}
                pauseOnHover={true}
            />
        </div>
    )
}

export default FormProject
