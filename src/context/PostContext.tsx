import { useContext, createContext, useState } from 'react'
import { Children } from '../services/Interfaces'
import { PostContextInterface } from "../services/Interfaces"

const PostContext = createContext<PostContextInterface | undefined>(undefined)

const usePostContext = () => useContext(PostContext)

const PostProvider = ({ children }: Children) => {
    const [createPost, setCreatePost] = useState({
        title: '',
        types: [] as string[],
        contents: ''
    })

    const [editPost, setEditPost] = useState({
        title: '',
        types: [] as string[],
        contents: ''
    })

    const [updatePost, setUpdatePost] = useState({
        postId: '',
        title: '',
        types: [] as string[],
        contents: ''
    })

    const values = {
        createPost, setCreatePost,
        updatePost, setUpdatePost,
        editPost, setEditPost
    }

    return (
        <PostContext.Provider value={values}>
            {children}
        </PostContext.Provider>
    )
}

export { PostProvider, usePostContext }
