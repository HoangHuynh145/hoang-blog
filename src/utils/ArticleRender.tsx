import { useEffect } from "react"
import MarkdownIt from 'markdown-it'
import markdownItAttrs from "markdown-it-attrs";
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import "../assets/highlight/prism.css"
import "../assets/highlight/prism"
import 'prismjs/components/prism-cshtml';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { buttonState } from "../data/typeData"


const ArticleRender = ({ markdown }: { markdown: string }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const md = new MarkdownIt({
        html: true, // enable HTML tags in source
        breaks: true, // convert '\n' in paragraphs into <br>
        linkify: true, // automatically link URLs
    });

    md.use(markdownItAttrs)
    const html = md.render(markdown);
    const clean = DOMPurify.sanitize(html)

    const getParent = (element: Element, selector: string) => {
        while (element.parentElement) {
            if (element.parentElement?.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    const handleClick = (btn: Element) => {
        const codeBlock = getParent(btn, '.code-block')
        if (codeBlock) {
            const codeContent = codeBlock.querySelector('pre code')?.textContent
            navigator.clipboard.writeText(codeContent as string)
        }
        btn.innerHTML = buttonState.copied

        setTimeout(() => {
            btn.innerHTML = buttonState.default
        }, 1500);
    }

    useEffect(() => {
        const btns = document.querySelectorAll('.copy-code')
        btns.forEach(btn => {
            btn.innerHTML = buttonState.default
            btn.addEventListener("click", () => handleClick(btn))
        })

        return () => (
            btns.forEach(btn => {
                btn.removeEventListener("click", () => handleClick(btn))
            })
        )
    }, [])

    return (
        <article
            className='mt-12 mb-16 prose prose-slate dark:prose-dark mx-auto'
            dangerouslySetInnerHTML={{ __html: clean }}
        />
    );
}

export default ArticleRender
