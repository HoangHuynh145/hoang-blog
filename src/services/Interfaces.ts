import { IconType } from "react-icons";

export interface Children {
    children: React.ReactNode
}

export interface ThemeInterface {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

export interface TotalInfoProps {
    TotalWorkplaces: number
    TotalArticles: number
    TotalProjects: number
}

export interface Contact {
    likes: number
    comments: number
}

export interface Author {
    userId: string
    authorId: string
    authorEmail: string
    authorName: string
    avatar: string
    textDesc: string
}

export interface PreviewData {
    title: string
    contents: string
    type: [string]
}

export interface TeachColors {
    [key: string]: string;
}

export interface Post extends PreviewData {
    postId: string
    authorId: string
    introContent: string
    contact: Contact
    createdAt: string
    author: Author
    slug: string
}

export interface PostContextInterface {
    createPost: {
        title: string;
        types: string[];
        contents: string
    }

    setCreatePost: React.Dispatch<React.SetStateAction<{
        title: string;
        types: string[];
        contents: string;
    }>>

    editPost: {
        postId?: string
        title: string;
        types: string[];
        contents: string
    }

    setEditPost: React.Dispatch<React.SetStateAction<{
        postId?: string
        title: string;
        types: string[];
        contents: string;
    }>>

    updatePost: {
        postId: string
        title: string
        types: string[]
        contents: string
    }

    setUpdatePost: React.Dispatch<React.SetStateAction<{
        postId: string
        title: string;
        types: string[];
        contents: string;
    }>>
}

export interface Workplace {
    workplaceId: string
    name: string;
    descWork: string;
    dateStart: string;
    dateEnd: string
}

export interface Project {
    projectId?: string;
    name: string;
    desc: string;
    technologies: string[];
    link: string,
    dateDeploy: string
}

export interface MenuItems {
    id: number;
    icon: IconType;
    name: string;
    split: boolean;
    arrow: boolean;
    link: string;
    justAdmin: boolean;
    isDeveloping: boolean;
}

export interface UserLoginInfo {
    accessToken: string
    userId: string
    avatar: string
    email: string
    isAdmin: boolean
    userHashtag: string
    username: string
    __typename: string
}

interface BasicReduxState {
    isFectching: boolean
    success: boolean
    error: boolean
}

export interface AuthState {
    currentUser: UserLoginInfo | null
    emailUser: string | null
    login: BasicReduxState
    register: BasicReduxState
    logout: BasicReduxState
}

export interface OwnPost {
    postId: string
    thumbnail: string
    introContent: string
    title: string
    slug: string
}

export interface PostDocument extends OwnPost {
    likes: number | undefined
    comments: number | undefined
    createdAt: Date
    updatedAt: Date
    _id: string
    types: [string]
    contents: string
}

export interface UpdateState {
    selectedArticle: PostDocument | null,
    selectedProject: Project | null
    selectedWorkplace: Workplace | null
    isUpdateLoading: boolean
}

export interface UserArticlesProps {
    postId: string
    thumb: string
    title: string
    introContent: string
    setLoadingArticle: React.Dispatch<React.SetStateAction<boolean>>
}


export interface PopupContext {
    popupState: {
        type: string
        isOpen: boolean
        id: string
        name: string
    }
    setPopupState: React.Dispatch<React.SetStateAction<{
        type: string
        isOpen: boolean
        id: string
        name: string
    }>>
}


export interface Profile {
    avatar: string;
    isAdmin: boolean;
    username: string;
    ownPosts: [OwnPost] | []
}
