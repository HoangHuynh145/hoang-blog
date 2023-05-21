import { useEffect } from 'react'
import MarkdownEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import CodeBlock from '../../lib/plugins/CodeBlock';
import { plugins } from "../../lib/plugins/EditorPlugins"
import { usePostContext } from '../../context/PostContext';
import { PostContextInterface } from '../../services/Interfaces';
import { useNavigate } from 'react-router-dom';
import markdownItAttrs from "markdown-it-attrs";
import 'react-markdown-editor-lite/lib/index.css';
import { useAppSelector } from '../../redux/Hooks';

MarkdownEditor.use(CodeBlock)

const FormContent = () => {
    const navigate = useNavigate()
    const isUpdating = location.pathname.split('/')[1] === 'update'
    const { editPost, setEditPost } = usePostContext() as PostContextInterface
    const accessToken = useAppSelector(state => state.authState.currentUser?.accessToken)

    const mdParser = new MarkdownIt({
        html: true, // enable HTML tags in source
        breaks: true, // convert '\n' in paragraphs into <br>
        linkify: true // automatically link URLs
    })

    mdParser.use(markdownItAttrs, {
        leftDelimiter: '{',
        rightDelimiter: '}',
        allowedAttributes: []
    })

    const handleCombackTitle = () => {
        if (isUpdating) {
            navigate(`/update/article/${editPost.postId}/title`, { state: { isComback: true } })
        } else {
            navigate("/create/article/title", { state: { isComback: true } })
        }
    }

    useEffect(() => {
        if (!editPost.title || editPost.types.length === 0) {
            handleCombackTitle()
        } else if (!accessToken) {
            navigate('/auth/login')
        } else {
            document.title = `${editPost.title}.`
        }
    }, [])


    return (
        <div className='w-screen h-screen flex flex-col'>
            <MarkdownEditor
                plugins={plugins}
                className='flex-1 h-[calc(100vh-65px)]'
                renderHTML={text => mdParser.render(text)}
                onChange={({ text }) => setEditPost({ ...editPost, contents: text })}
                value={editPost.contents}
            />

            <div className='p-2 flex items-center justify-between bg-white border-t border-slate-800' >
                <button
                    className='step-create-blog-btn'
                    onClick={handleCombackTitle}
                >
                    Quay lại
                </button>

                <button
                    className='step-create-blog-btn'
                    onClick={() => navigate("/article/preview", { state: { isUpdating } })}
                >

                    Xem trước bài viết
                </button>
            </div>
        </div>
    )
}

export default FormContent
