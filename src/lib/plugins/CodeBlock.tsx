import { PluginProps } from 'react-markdown-editor-lite';


const CodeBlock = (props: PluginProps) => {
    const defaultContent = "<div class='code-block'>\n<div class='code-info'>\n<span class='language-code'></span>\n<button class='copy-code'></button>\n</div>\n\n```\n\n```\n\n</div>"

    const handleClick = () => {
        props.editor.insertText(defaultContent)
    }

    return (
        <span
            className="button button-type-code-block"
            title="Code block"
            onClick={handleClick}
        >
            <i className='rmel-iconfont rmel-icon-code-block'></i>
        </span>
    );
}

CodeBlock.align = 'left';
CodeBlock.pluginName = 'code-block';

export default CodeBlock
