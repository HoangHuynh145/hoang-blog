import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='mx-auto max-w-8xl'>
            <div className='mx-4'>
                <div className='border-t border-b border-slate-600 w-full pt-8 pb-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7'>
                        <ul className='col-span-1'>
                            <li className='item-footer mb-3 font-semibold text-slate-900 dark:text-slate-100'>Sản phẩm</li>
                            <Link to="/">
                                <li className='item-footer mb-2 cursor-pointer dark:text-slate-400 text-slate-700 hover:opacity-80'>Bài viết</li>
                            </Link>
                        </ul>

                        <ul className='col-span-1'>
                            <li className='item-footer mb-3 font-semibold text-slate-900 dark:text-slate-100'>Liên hệ</li>
                            <Link to="https://www.facebook.com/profile.php?id=100011362084048" >
                                <li className='item-footer mb-2 cursor-pointer dark:text-slate-400 text-slate-700 hover:opacity-80'>Facebook</li>
                            </Link>
                            <Link to="https://github.com/HoangHuynh145">
                                <li className='item-footer mb-2 cursor-pointer dark:text-slate-400 text-slate-700 hover:opacity-80'>Github</li>
                            </Link>
                        </ul>

                        <ul className='col-span-1'>
                            <li className='item-footer mb-3 font-semibold text-slate-900 dark:text-slate-100' >Giới thiệu</li>
                            <li className='item-footer dark:text-slate-400 text-slate-700'>
                                Phát triển bởi Huỳnh Huy Hoàng vào năm 2023, là blog cá nhân nhằm chia sẻ kiến thức về công nghệ thông tin và cuộc sống, bên cạnh đó cũng là một nguồn tài liệu hữu ích nhằm giúp mọi người nâng cao kỹ năng cá nhân một cách nhanh chóng và hiệu quả.
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
