import mine from "../../assets/imgs/mine.jpg"

const Self = () => {
    return (
        <section className='mt-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-5 xl:gap-10'>
                <div className=' md:col-span-1 xl:col-span-2 text-slate-800 dark:text-slate-200'>
                    <h2 className='capitalize'>
                        about
                        <span className='text-cyan-500'> me</span>
                    </h2>
                    <h3 className='capitalize'>frontend developer!</h3>
                    <div className='mt-10  text-slate-800 dark:text-slate-200'>
                        <p className='mt-6 leading-relaxed'>
                            Mình đang là một <span className='box-text'>sinh viên năm 2</span>. Niềm đam mê lập trình web của mình bắt đầu từ năm đầu tiên ở trường đại học, mình đã tự tìm kiếm các khoá học lập trình và vô tình biết đến mảng lập trình web. Kể từ đó, mình háo hức tìm hiểu thêm về phát triển web và cách tạo các trang web động và hấp dẫn.
                        </p>
                        <p className='mt-6 leading-relaxed'>
                            Là một sinh viên ngành công nghệ thông tin, mình không ngừng cố gắng nâng cao kỹ năng của mình và luôn cập nhật những xu hướng và công nghệ mới nhất trong ngành. Mình rất hào hứng được tiếp tục học hỏi và phát triển với bản thân và trong khoảng thời gian trong tương lai. Trong khoảng thời gian học tập mình đã gặp rất nhiều khó khăn cũng như những điều hay ho. Và bây giờ mình chia sẻ lại những kiến thức mình biết với mọi người tại trang blog này.
                        </p>
                        <p className='mt-6 leading-relaxed'>
                            Nội dung trên blog đa dạng chủ đề từ <span className='text-indigo-500'>lập trình</span>, <span className='text-pink-500'>cuộc sống</span>... Tất cả đều dựa trên tiêu chí giải trí, thiết thực và hữu ích.
                        </p>
                    </div>
                </div>
                <img src={mine} alt="mine" className='col-span-1 h-full w-auto object-cover object-right rounded-2xl' />
            </div>
        </section>
    )
}

export default Self
