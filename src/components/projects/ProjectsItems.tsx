import { Dispatch, useEffect } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { RiQuillPenLine } from 'react-icons/ri'
import { VscTrash } from 'react-icons/vsc'
import { PopupContext, Project } from '../../services/Interfaces'
import { Link, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { getProjectById } from '../../graphql-client/queries'
import { useAppSelector } from '../../redux/Hooks'
import { usePopupContext } from '../../context/PopupContext'
import dateToString from '../../utils/FormatDate'

const ProjectsItems = (
    { project, setLoadingProject }:
        { project: Project, setLoadingProject: Dispatch<React.SetStateAction<boolean>> }
) => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.authState.currentUser)
    const { setPopupState } = usePopupContext() as PopupContext

    const [getProject, { loading }] = useLazyQuery(getProjectById, {
        variables: { projectId: project.projectId },
        context: {
            headers: {
                token: `Bearer ${user?.accessToken}`
            }
        },
        onCompleted: () => {
            navigate(`/update/project/${project.projectId}`)
        }
    })

    const handleDeleteProject = () => {
        setPopupState({
            type: 'dự án',
            isOpen: true,
            id: project.projectId!,
            name: project.name
        })
    }

    useEffect(() => {
        setLoadingProject(loading)
    }, [loading])

    return (
        <article className='group relative'>
            <div className='timeline-mask'></div>
            <svg viewBox="0 0 9 9" className='icon-line'>
                <circle cx="4.5" cy="4.5" r="4.5" stroke="currentColor" className='fill-slate-100 dark:fill-slate-900' strokeWidth="1.5"></circle>
            </svg>
            <dl className='absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]'>
                <dt className='sr-only'>Date</dt>
                <dd className='whitespace-nowrap text-sm leading-6 text-slate-500 dark:text-slate-400' >
                    <time dateTime={new Date(Number(project.dateDeploy)).toISOString()} >
                        {dateToString(project.dateDeploy, "DD-MM-YYYY")}
                    </time>
                </dd>
            </dl>
            <div className='cursor-pointer'>
                <div className='relative text-slate-900 dark:text-slate-200 cursor-pointer'>
                    <h3 className='timeline-title'>
                        {project.name}
                    </h3>
                    <p className='timeline-intro'>
                        {project.desc}
                    </p>
                    <ul className='mb-4 text-slate-700 dark:text-slate-400'>
                        <li className='text-slate-900 dark:text-slate-200 font-medium'>Công nghệ sử dụng:</li>
                        {project.technologies.map((tech) => (
                            <li className='timeline-projects-list capitalize' key={tech}>{tech}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Link to={project.link}>
                <div className='relative text-sky-500 flex items-center gap-1 cursor-pointer'>
                    <p>Visit now</p>
                    <FaAngleRight size={14} />
                </div>
            </Link>
            {
                user?.isAdmin && (
                    <div className='relative flex gap-4 items-center text-slate-700 dark:text-white mt-2'>
                        <span
                            className='cursor-pointer hover:opacity-75'
                            onClick={() => getProject()}
                        >
                            <RiQuillPenLine size={20} />
                        </span>
                        |
                        <span
                            className='cursor-pointer hover:opacity-75'
                            onClick={handleDeleteProject}
                        >
                            <VscTrash size={20} />
                        </span>
                    </div>
                )
            }
        </article>
    )
}

export default ProjectsItems
