import { SlNote, SlNotebook } from "react-icons/sl"
import { HiOutlineArrowDownTray } from "react-icons/hi2"
import { IoSettingsOutline } from "react-icons/io5"
import { TeachColors } from "../services/Interfaces"

export const typeData = [
    {
        id: 0,
        name: 'html',
        tagName: 'tag/html',
    },
    {
        id: 1,
        name: 'css',
        tagName: 'tag/css',
    },
    {
        id: 2,
        name: 'javascript',
        tagName: 'tag/javascript',
    },
    {
        id: 3,
        name: 'reactjs',
        tagName: 'tag/reactjs',
    },
    {
        id: 4,
        name: 'nodejs',
        tagName: 'tag/nodejs',
    },
    {
        id: 5,
        name: 'nextjs',
        tagName: 'tag/nextjs',
    },
    {
        id: 6,
        name: 'tips',
        tagName: 'tag/tips',
    }
]


export const typeColor: TeachColors = {
    html: 'bg-orange-600',
    css: 'bg-blue-500',
    javascript: 'bg-yellow-500',
    reactjs: 'bg-sky-700',
    nodejs: 'bg-lime-500',
    nextjs: 'bg-black',
    tips: 'bg-pink-500'
}

export const buttonState = {
    default: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy',
    copied: '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>Copied!'
}


export const userMenu = [
    {
        id: 0,
        icon: SlNote,
        name: 'Viết Blog',
        split: false,
        arrow: true,
        link: "/create/article/title",
        justAdmin: true,
        isDeveloping: false,
    },

    {
        id: 1,
        icon: SlNotebook,
        name: 'Bài viết của tôi',
        split: false,
        arrow: true,
        link: "/me/articles",
        justAdmin: false,
        isDeveloping: false,
    },

    {
        id: 2,
        icon: HiOutlineArrowDownTray,
        name: 'Bài viết đã lưu',
        split: true,
        arrow: true,
        link: "/",
        justAdmin: false,
        isDeveloping: true,
    },

    {
        id: 3,
        icon: IoSettingsOutline,
        name: 'Cài đặt',
        split: false,
        arrow: true,
        link: "/setting",
        justAdmin: false,
        isDeveloping: false,
    },
]

export const mobileMenu = [
    {
        id: 0,
        name: 'Blog',
        link: "/blog"
    },

    {
        id: 1,
        name: 'Project',
        link: "/projects"
    },

    {
        id: 2,
        name: 'resume',
        link: "/resume"
    },

    {
        id: 3,
        name: 'Bài viết của tôi',
        link: "/me/articles"
    },

    {
        id: 4,
        name: 'Cài đặt',
        link: "/setting"
    },
]