import { useEffect, useState } from 'react'
import Navbar from '../../layouts/Navbar'
import ProjectsItems from '../../components/projects/ProjectsItems'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getProjects } from '../../graphql-client/queries'
import Loader from '../../components/loader/Loader'
import { PopupContext, Project } from '../../services/Interfaces'
import { useAppSelector } from '../../redux/Hooks'
import DeletePopup from '../../components/popup/DeletePopup'
import { usePopupContext } from '../../context/PopupContext'

const Projects = () => {
    const [loadingProject, setLoadingProject] = useState(false)
    const navigate = useNavigate()
    const isAdmin = useAppSelector(state => state.authState.currentUser?.isAdmin)
    const { popupState } = usePopupContext() as PopupContext
    const { loading, error, data } = useQuery(getProjects)

    useEffect(() => {
        document.title = 'Danh sách dự án.'
        window.scrollTo(0, 0);
    }, [])

    if (error) {
        console.log(error)
    }

    return (
        <div className='art-bg-article'>
            <Navbar />
            {(loading || loadingProject) && <Loader />}
            {popupState.isOpen && <DeletePopup />}
            <div className='py-16 px-4 flex justify-center items-center flex-col text-slate-900 dark:text-slate-200'>
                <h2 className='mb-4 font-bold'>Hoàng Huỳnh Projects</h2>
                <p className='w-full text-lg mb-3 text-left md:text-center'>
                    Tổng hợp những dự án mà mình đã thực hiện.
                </p>
                {
                    isAdmin && (
                        <button
                            className='py-2.5 px-4 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-lg hover:opacity-90 self-center text-white'
                            onClick={() => navigate("/create/project")}
                        >
                            Tạo thêm dự án
                        </button>
                    )
                }
            </div>
            <div className='timeline-container'>
                <div className='timeline-content'>
                    <span className='line'></span>
                    <div className='space-y-6 md:space-y-16'>
                        {data?.projects.map((project: Project) => (
                            <div
                                key={project.projectId}
                                className='border-b pb-6 border-b-slate-800/20 dark:border-b-slate-200/20 md:pb-0 md:border-b-0 last:border-b-0'
                            >
                                <ProjectsItems project={project} setLoadingProject={setLoadingProject} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects
