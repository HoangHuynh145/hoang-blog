import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";

const MarkdownRender = (content: string) => {
    const md = new MarkdownIt({
        html: true, // enable HTML tags in source
        breaks: true, // convert '\n' in paragraphs into <br>
        linkify: true, // automatically link URLs
    });
    const html = md.render(content);
    const clean = DOMPurify.sanitize(html)
    return clean;
}

export default MarkdownRender
